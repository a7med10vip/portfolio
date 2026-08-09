-- ─────────────────────────────────────────────────────────────────────────────
-- Client Portal Schema — paste & run in Supabase SQL Editor
-- ─────────────────────────────────────────────────────────────────────────────

-- ─── PROFILES ────────────────────────────────────────────────────────────────
create table if not exists public.profiles (
  id         uuid references auth.users(id) on delete cascade primary key,
  email      text not null,
  role       text not null default 'client' check (role in ('admin', 'client')),
  full_name  text,
  username   text unique,
  company    text,
  phone      text,
  avatar_url text,
  created_at timestamptz default now()
);

-- ─── PROJECTS ────────────────────────────────────────────────────────────────
create table if not exists public.projects (
  id          uuid primary key default gen_random_uuid(),
  client_id   uuid references public.profiles(id) on delete cascade not null,
  title       text not null,
  description text,
  status      text not null default 'active'
              check (status in ('active', 'paused', 'completed', 'cancelled')),
  progress    int  not null default 0 check (progress >= 0 and progress <= 100),
  deadline    date,
  created_at  timestamptz default now(),
  updated_at  timestamptz default now()
);

-- ─── PHASES ──────────────────────────────────────────────────────────────────
create table if not exists public.phases (
  id          uuid primary key default gen_random_uuid(),
  project_id  uuid references public.projects(id) on delete cascade not null,
  title       text not null,
  description text,
  status      text not null default 'pending'
              check (status in ('pending', 'active', 'done')),
  ord         int  not null default 0,
  created_at  timestamptz default now(),
  updated_at  timestamptz default now()
);

-- ─── FILES ───────────────────────────────────────────────────────────────────
create table if not exists public.files (
  id          uuid primary key default gen_random_uuid(),
  project_id  uuid references public.projects(id) on delete cascade not null,
  name        text not null,
  url         text not null,
  size        bigint,
  mime_type   text,
  uploaded_by text not null check (uploaded_by in ('admin', 'client')),
  created_at  timestamptz default now()
);

-- ─── NOTIFICATIONS ───────────────────────────────────────────────────────────
create table if not exists public.notifications (
  id         uuid primary key default gen_random_uuid(),
  client_id  uuid references public.profiles(id) on delete cascade not null,
  title      text not null,
  message    text,
  read       boolean not null default false,
  created_at timestamptz default now()
);

-- ─── ACTIVITY LOG ────────────────────────────────────────────────────────────
create table if not exists public.activity_log (
  id         uuid primary key default gen_random_uuid(),
  project_id uuid references public.projects(id) on delete cascade,
  client_id  uuid references public.profiles(id),
  actor      text not null check (actor in ('admin', 'client')),
  action     text not null,
  details    jsonb,
  created_at timestamptz default now()
);

-- ─── AUTO-UPDATE updated_at ───────────────────────────────────────────────────
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end;
$$;

drop trigger if exists projects_set_updated_at on public.projects;
create trigger projects_set_updated_at before update on public.projects
  for each row execute function public.set_updated_at();

drop trigger if exists phases_set_updated_at on public.phases;
create trigger phases_set_updated_at before update on public.phases
  for each row execute function public.set_updated_at();

-- ─── AUTO-CREATE PROFILE ON AUTH SIGNUP ──────────────────────────────────────
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = '' as $$
begin
  insert into public.profiles (id, email, role, full_name, username)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'role', 'client'),
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'username'
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ─── ROW LEVEL SECURITY ──────────────────────────────────────────────────────
alter table public.profiles      enable row level security;
alter table public.projects      enable row level security;
alter table public.phases        enable row level security;
alter table public.files         enable row level security;
alter table public.notifications enable row level security;
alter table public.activity_log  enable row level security;

-- Drop existing policies to avoid conflicts on re-run
drop policy if exists "client reads own profile"         on public.profiles;
drop policy if exists "client reads own projects"        on public.projects;
drop policy if exists "client reads own phases"          on public.phases;
drop policy if exists "client reads own files"           on public.files;
drop policy if exists "client uploads files"             on public.files;
drop policy if exists "client reads own notifications"   on public.notifications;
drop policy if exists "client marks notifications read"  on public.notifications;
drop policy if exists "client reads own activity"        on public.activity_log;

-- Profiles: clients read their own row
create policy "client reads own profile" on public.profiles
  for select using (auth.uid() = id);

-- Projects: clients see their own
create policy "client reads own projects" on public.projects
  for select using (client_id = auth.uid());

-- Phases: clients see phases of their projects
create policy "client reads own phases" on public.phases
  for select using (
    exists (select 1 from public.projects
            where id = phases.project_id and client_id = auth.uid())
  );

-- Files: clients read/upload files in their projects
create policy "client reads own files" on public.files
  for select using (
    exists (select 1 from public.projects
            where id = files.project_id and client_id = auth.uid())
  );
create policy "client uploads files" on public.files
  for insert with check (
    uploaded_by = 'client' and
    exists (select 1 from public.projects
            where id = files.project_id and client_id = auth.uid())
  );

-- Notifications: clients read and mark-read their own
create policy "client reads own notifications" on public.notifications
  for select using (client_id = auth.uid());
create policy "client marks notifications read" on public.notifications
  for update using (client_id = auth.uid())
  with check (client_id = auth.uid());

-- Activity log: clients read their own
create policy "client reads own activity" on public.activity_log
  for select using (client_id = auth.uid());

-- ─── STORAGE ─────────────────────────────────────────────────────────────────
-- 1. Go to Supabase Dashboard → Storage → New Bucket
--    Name: "project-files", Public: OFF (private)
-- 2. Admin uploads are handled via service role (bypasses RLS)
-- 3. Client uploads go through the /client/project/[id] page
--    using the anon key + user JWT — Storage RLS policy needed:
--
-- Run this after creating the bucket:
-- create policy "clients read project files" on storage.objects for select
--   using (bucket_id = 'project-files' and auth.role() = 'authenticated');
-- create policy "clients upload project files" on storage.objects for insert
--   with check (bucket_id = 'project-files' and auth.role() = 'authenticated');
