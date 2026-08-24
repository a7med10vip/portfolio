/**
 * Every number and every quoted line on the delivery page lives here.
 *
 * The point is not tidiness. A handover document that states forty figures is
 * asking to be believed forty times and the only honest way to ask that is to
 * say where each one came from. So a figure is not a number in this file, it is
 * a number, the command that produced it, the tree it was run against and the
 * date. The page renders the provenance beside the value.
 *
 * Counted at commit f92ea59 of the Motion Motors monorepo, 24 August 2026.
 */

export const STAMP = {
  commit: "f92ea59",
  countedOn: "24 August 2026",
  firstCommit: "5 June 2026",
  lastCommit: "24 August 2026",
  days: 80,
} as const;

/** Where a figure came from and therefore how much it can be leaned on. */
export type FigureSource = "repo" | "db" | "analytics";

export interface FigureDef {
  value: number;
  display?: string;
  label: string;
  /** What was counted, in a sentence. */
  method: string;
  /** The command that produces it, so the reader can re-run it. */
  command?: string;
  source: FigureSource;
}

export const FIGURES = {
  files: {
    value: 492,
    label: "source files",
    method:
      "Tracked TypeScript and SQL files in the monorepo. git ls-files rather than find, because find walks node_modules, .next and the macOS resource-fork twins the drive is full of, that difference alone is 300 files.",
    command: "git ls-files '*.ts' '*.tsx' | wc -l   # 399\ngit ls-files 'packages/db/supabase/migrations/*.sql' | wc -l   # 93",
    source: "repo",
  },
  lines: {
    value: 77963,
    label: "lines written",
    method: "64,053 lines of TypeScript and TSX plus 13,910 lines of SQL migrations. Comments included, on this codebase they are half the argument.",
    command: "git ls-files '*.ts' '*.tsx' -z | xargs -0 cat | wc -l",
    source: "repo",
  },
  commits: {
    value: 181,
    label: "commits",
    method:
      "Commits on main to 24 August 2026. 172 of them are since 5 June, when the build proper started; the other nine are the event app from 7 May that was folded into the monorepo later.",
    command: "git rev-list --count HEAD",
    source: "repo",
  },
  days: {
    value: 80,
    label: "days",
    method:
      "5 June to 24 August 2026, which is when the four applications were built. The repository opens a month earlier, on 7 May, but those nine commits are the standalone event app that existed before any of this and was folded in afterwards. Not full-time days either: this ran alongside the marketing account.",
    command: "git rev-list --count --since=2026-06-05 HEAD   # 172 of the 181",
    source: "repo",
  },
  pages: {
    value: 72,
    label: "pages",
    method: "page.tsx files across the three codebases: 26 on the website, 16 in the events system, 30 in the dashboard. The Arabic and English versions of a route count once.",
    command: "find apps/*/src/app -name page.tsx | wc -l",
    source: "repo",
  },
  tables: {
    value: 45,
    label: "tables",
    method: "CREATE TABLE statements across the 93 migrations, deduplicated by table name.",
    command:
      "grep -rhoiE \"create table (if not exists )?(public\\.)?[a-z_0-9]+\" migrations | awk '{print tolower($NF)}' | sort -u | wc -l",
    source: "repo",
  },
  functions: {
    value: 126,
    label: "database functions",
    method: "Distinct function names created across the migrations. 163 CREATE FUNCTION statements resolve to 126 functions, because a migration that changes one replaces it.",
    command:
      "grep -rhoiE \"create (or replace )?function (public\\.)?[a-z_0-9]+\" migrations | awk '{print tolower($NF)}' | sort -u | wc -l",
    source: "repo",
  },
  policies: {
    value: 85,
    label: "row-level security policies",
    method: "CREATE POLICY statements across the migrations. Every one of the 45 tables has RLS enabled; not one is readable by accident.",
    command: "grep -rhciE 'create policy' migrations | paste -sd+ - | bc",
    source: "repo",
  },
  migrations: {
    value: 93,
    label: "migrations",
    method: "Numbered SQL files from 20260507_000_init.sql to 20260823_016_chat_transfer.sql. The schema is a file history, replayable from nothing.",
    command: "git ls-files 'packages/db/supabase/migrations/*.sql' | wc -l",
    source: "repo",
  },
  indexes: {
    value: 82,
    label: "indexes",
    method:
      "CREATE INDEX statements written by hand, deduplicated. The live database reports more, because every primary key and unique constraint brings an index with it that nobody typed.",
    command:
      "grep -rhoiE \"create (unique )?index (concurrently )?(if not exists )?[a-z_0-9]+\" migrations | awk '{print tolower($NF)}' | sort -u | wc -l",
    source: "repo",
  },
  triggers: {
    value: 6,
    label: "triggers",
    method: "CREATE TRIGGER statements, deduplicated by name, the things that must happen together, happening together.",
    command: "grep -rhoiE 'create trigger [a-z_0-9]+' migrations | awk '{print tolower($NF)}' | sort -u | wc -l",
    source: "repo",
  },
  views: { value: 2, label: "views", method: "store_sweep_runs and test_drive_log.", source: "repo" },
  permissions: {
    value: 25,
    label: "permissions",
    method: "Rows inserted into public.permissions by 20260817_002_roles_permissions.sql. Ten of them are marked sensitive: they move money or change who can see what.",
    source: "repo",
  },
  roles: {
    value: 8,
    label: "roles",
    method: "Rows in public.roles, all system roles. Flat, not hierarchical, a person holds several and their permissions are the union.",
    source: "repo",
  },
  crons: {
    value: 8,
    label: "scheduled jobs",
    method: "pg_cron jobs live in the schema today. A ninth, expire-stale-calls, was unscheduled on 23 August when voice calling was removed.",
    command: "grep -rhoE \"cron\\.schedule\\([^,]+, *'[^']+'\" migrations",
    source: "repo",
  },
  runsPerDay: {
    value: 986,
    label: "runs a day",
    method:
      "Computed from the eight cron expressions, not sampled: three jobs every five minutes (864), one every fifteen (96), one hourly (24), two daily, one weekly.",
    source: "repo",
  },
} satisfies Record<string, FigureDef>;

export type FigureKey = keyof typeof FIGURES;

/* ═══════════════════════════ THE FOUR APPLICATIONS ═══════════════════════ */

export interface AppDef {
  key: string;
  n: string;
  name: string;
  host: string;
  href: string;
  audience: string;
  pages: number;
  /** Fill density in the diagram, the four are told apart by weight, not colour. */
  weight: 1 | 0.62 | 0.34 | 0.14;
  blurb: string;
  points: string[];
  stack: string;
  shot?: string;
  shotCaption?: string;
  gated?: string;
}

export const APPS: AppDef[] = [
  {
    key: "website",
    n: "01",
    name: "The website",
    host: "motionmotors.me",
    href: "https://motionmotors.me",
    audience: "Anybody who arrives",
    pages: 26,
    weight: 1,
    blurb:
      "Arabic and English, both first-class. Not a brochure, a shop that sells a specific car, at the price the sheet says today, to somebody who signed in with a phone number and no password.",
    points: [
      "Five models, each with a 360° exterior spin in six colours at two resolutions, interior panoramas and specifications drawn from the price list rather than typed a second time.",
      "A shop that sells actual cars: a specific VIN, nine add-ons, a deposit policy and an order reference the customer can track.",
      "Compare and save against the browser, then adopted into the account the moment they sign in.",
      "Test drives against real slots, the calendar knows what is already booked and the booking is tied to one car on the floor.",
      "An assistant that answers from the dealer's own price sheet and hands over to a person the moment one is asked for.",
    ],
    stack: "Next 16 · next-intl · Supabase SSR · Gemini 2.5 Flash · WATI",
    shot: "site-ar-home-desktop",
    shotCaption: "Arabic, which is the default",
  },
  {
    key: "showroom",
    n: "02",
    name: "The showroom tool",
    host: "showroom.motionmotors.me",
    href: "https://showroom.motionmotors.me",
    audience: "The salesperson, standing with a customer",
    pages: 4,
    weight: 0.62,
    blurb:
      "The same codebase as the website, built a second time with one environment variable set and locked to four screens. Every other path on that host redirects here and it refuses search engines outright.",
    points: [
      "Registering a walk-in in the time it takes to ask: name, number, model, grade, colour and which car on the floor exactly.",
      "Taking a deposit and holding that VIN, with the salesperson taken from the session rather than typed into a box.",
      "A test-drive evaluation filled in with the customer while the car is still warm, tied to the unit they drove.",
      "A showcase mode to hand across the desk: the 360° spin, full screen, no navigation.",
    ],
    stack: "The website's build with NEXT_PUBLIC_SALES_ONLY=1 · one middleware · no second codebase",
    shot: "showroom-en-sales-desktop",
    shotCaption: "The screen the floor works from",
  },
  {
    key: "ops",
    n: "03",
    name: "The events system",
    host: "motion-motors.vercel.app",
    href: "https://motion-motors.vercel.app",
    audience: "Mall stands and test-drive days",
    pages: 16,
    weight: 0.34,
    blurb:
      "Built first, before the rest of it existed, for a stand in a mall with a queue in front of it. Folded into the monorepo afterwards rather than left to drift.",
    points: [
      "Self-registration at the stand and a live queue the staff work through.",
      "Campaign forms with financing questions and a leads list that says who has been rung and by whom.",
      "The stock screen, every car, its status and the deposit that is holding it.",
    ],
    stack: "Next 16 · TanStack Query · ExcelJS exports · the same Postgres",
    shot: "ops-ar-landing-desktop",
    shotCaption: "The stand, self-registering",
    gated: "11 of its 16 screens are behind a staff sign-in",
  },
  {
    key: "admin",
    n: "04",
    name: "The dashboard",
    host: "live.motionmotors.me",
    href: "https://live.motionmotors.me",
    audience: "Management, behind a login",
    pages: 30,
    weight: 0.14,
    blurb:
      "The largest of the four and the only one nobody outside the building can see. Twenty-five permissions across eight roles decide which of its thirty screens a given person gets.",
    points: [
      "Today, what needs somebody right now, on one screen: chats waiting, deposits about to expire, leads nobody has rung, open orders, errors.",
      "Live chat: the queue grouped by whose problem it is, the whole customer history beside it, saved replies, tags, car cards sent into the conversation, transfer to a colleague and search across every conversation ever held.",
      "Stock by VIN, with ageing measured four ways, including from the people who actually drove it.",
      "Money: orders, deposits, reservations, financing applications and the price list itself, editable without a deploy.",
      "Traffic: Google Analytics and Search Console, a world map, landing pages and what people searched to arrive.",
    ],
    stack: "Next 16 · GA4 Data API · Search Console · Recharts · Supabase Realtime",
    shot: "admin-dashboard-desktop",
    shotCaption: "Today, the screen the dashboard opens on",
    gated: "All 30 of its screens are behind a staff sign-in; this one was supplied for the handover",
  },
];

/* ═══════════════════════════ ROUTES ══════════════════════════════════════ */

export interface RouteDef {
  app: "website" | "showroom" | "ops" | "admin";
  path: string;
  group: string;
  dynamic?: boolean;
  localised?: boolean;
  auth?: boolean;
}

const w = (path: string, group: string, extra: Partial<RouteDef> = {}): RouteDef => ({
  app: "website",
  path,
  group,
  localised: true,
  ...extra,
});

export const ROUTES: RouteDef[] = [
  w("/", "The site"),
  w("/about", "The site"),
  w("/news", "The site"),
  w("/careers", "The site"),
  w("/showrooms", "The site"),
  w("/aftersales", "The site"),
  w("/privacy", "The site"),
  w("/terms", "The site"),
  w("/models", "Cars"),
  w("/models/[slug]", "Cars", { dynamic: true }),
  w("/prices", "Cars"),
  w("/test-drive", "Cars"),
  w("/store", "The shop"),
  w("/store/[vin]", "The shop", { dynamic: true }),
  w("/store/[vin]/reserve", "The shop", { dynamic: true }),
  w("/store/compare", "The shop"),
  w("/store/saved", "The shop"),
  w("/store/orders", "The shop"),
  w("/store/order/[reference]", "The shop", { dynamic: true }),
  w("/store/track", "The shop"),
  w("/park", "Camera"),
  w("/stage", "Camera"),
  { app: "showroom", path: "/sales", group: "The floor", localised: true, auth: true },
  { app: "showroom", path: "/sales/reserve", group: "The floor", localised: true, auth: true },
  { app: "showroom", path: "/sales/evaluation", group: "The floor", localised: true, auth: true },
  { app: "showroom", path: "/sales/showcase", group: "The floor", localised: true, auth: true },
  { app: "ops", path: "/", group: "The stand", localised: true },
  { app: "ops", path: "/lead", group: "The stand", localised: true },
  { app: "ops", path: "/queue", group: "The stand", localised: true },
  { app: "ops", path: "/thanks", group: "The stand", localised: true },
  { app: "ops", path: "/register/success/[publicId]", group: "The stand", localised: true, dynamic: true },
  { app: "ops", path: "/login", group: "The stand", localised: true },
  { app: "ops", path: "/dashboard", group: "Back office", localised: true, auth: true },
  { app: "ops", path: "/dashboard/queue", group: "Back office", localised: true, auth: true },
  { app: "ops", path: "/dashboard/stock", group: "Back office", localised: true, auth: true },
  { app: "ops", path: "/dashboard/showroom", group: "Back office", localised: true, auth: true },
  { app: "ops", path: "/dashboard/reservations", group: "Back office", localised: true, auth: true },
  { app: "ops", path: "/dashboard/campaign", group: "Back office", localised: true, auth: true },
  { app: "ops", path: "/dashboard/campaign/[id]", group: "Back office", localised: true, auth: true, dynamic: true },
  { app: "ops", path: "/dashboard/leads/[id]", group: "Back office", localised: true, auth: true, dynamic: true },
  { app: "ops", path: "/dashboard/registrations/[id]", group: "Back office", localised: true, auth: true, dynamic: true },
  { app: "ops", path: "/dashboard/admin", group: "Back office", localised: true, auth: true },
  { app: "admin", path: "/today", group: "Now", auth: true },
  { app: "admin", path: "/alerts", group: "Now", auth: true },
  { app: "admin", path: "/chat", group: "Conversation", auth: true },
  { app: "admin", path: "/chat/[id]", group: "Conversation", auth: true, dynamic: true },
  { app: "admin", path: "/response", group: "Conversation", auth: true },
  { app: "admin", path: "/customers", group: "Conversation", auth: true },
  { app: "admin", path: "/customers/[phone]", group: "Conversation", auth: true, dynamic: true },
  { app: "admin", path: "/stock", group: "Stock", auth: true },
  { app: "admin", path: "/ageing", group: "Stock", auth: true },
  { app: "admin", path: "/pricing", group: "Stock", auth: true },
  { app: "admin", path: "/addons", group: "Stock", auth: true },
  { app: "admin", path: "/orders", group: "Money", auth: true },
  { app: "admin", path: "/orders/[reference]", group: "Money", auth: true, dynamic: true },
  { app: "admin", path: "/deposits", group: "Money", auth: true },
  { app: "admin", path: "/reservations", group: "Money", auth: true },
  { app: "admin", path: "/finance", group: "Money", auth: true },
  { app: "admin", path: "/leads", group: "Demand", auth: true },
  { app: "admin", path: "/demand", group: "Demand", auth: true },
  { app: "admin", path: "/campaigns", group: "Demand", auth: true },
  { app: "admin", path: "/showroom", group: "Demand", auth: true },
  { app: "admin", path: "/appointments", group: "Demand", auth: true },
  { app: "admin", path: "/traffic", group: "Traffic", auth: true },
  { app: "admin", path: "/sources", group: "Traffic", auth: true },
  { app: "admin", path: "/reports", group: "Traffic", auth: true },
  { app: "admin", path: "/staff", group: "System", auth: true },
  { app: "admin", path: "/audit", group: "System", auth: true },
  { app: "admin", path: "/errors", group: "System", auth: true },
  { app: "admin", path: "/login", group: "System" },
  { app: "admin", path: "/no-access", group: "System" },
];

/* ═══════════════════════════ PERMISSIONS ════════════════════════════════ */

export interface PermissionDef {
  key: string;
  category: string;
  label: string;
  sensitive: boolean;
}

export const PERMISSIONS: PermissionDef[] = [
  { key: "stock:read", category: "Stock", label: "View stock", sensitive: false },
  { key: "stock:write", category: "Stock", label: "Add and edit stock", sensitive: false },
  { key: "stock:price", category: "Stock", label: "Set unit prices", sensitive: true },
  { key: "orders:read", category: "Orders", label: "View orders", sensitive: false },
  { key: "orders:write", category: "Orders", label: "Edit orders", sensitive: false },
  { key: "orders:cancel", category: "Orders", label: "Cancel orders", sensitive: true },
  { key: "orders:refund", category: "Orders", label: "Issue refunds", sensitive: true },
  { key: "deposits:read", category: "Orders", label: "View deposit policies", sensitive: false },
  { key: "deposits:write", category: "Orders", label: "Set deposit policies", sensitive: true },
  { key: "reservations:read", category: "Showroom", label: "View reservations", sensitive: false },
  { key: "reservations:write", category: "Showroom", label: "Create and close reservations", sensitive: true },
  { key: "showroom:read", category: "Showroom", label: "View showroom visits", sensitive: false },
  { key: "showroom:write", category: "Showroom", label: "Record visits and evaluations", sensitive: false },
  { key: "finance:read", category: "Finance", label: "View finance applications", sensitive: true },
  { key: "finance:decide", category: "Finance", label: "Approve or reject finance", sensitive: true },
  { key: "leads:read", category: "Demand", label: "View leads", sensitive: false },
  { key: "leads:write", category: "Demand", label: "Edit and follow up leads", sensitive: false },
  { key: "campaigns:read", category: "Demand", label: "View campaigns", sensitive: false },
  { key: "campaigns:write", category: "Demand", label: "Manage campaigns", sensitive: false },
  { key: "reports:read", category: "Ops", label: "View reports", sensitive: false },
  { key: "exports:run", category: "Ops", label: "Export data", sensitive: true },
  { key: "staff:read", category: "Admin", label: "View staff", sensitive: false },
  { key: "staff:manage", category: "Admin", label: "Manage staff and permissions", sensitive: true },
  { key: "settings:write", category: "Admin", label: "Change system settings", sensitive: true },
  { key: "audit:read", category: "Admin", label: "View the audit log", sensitive: true },
];

export interface RoleDef {
  key: string;
  name: string;
  arabic: string;
  grants: string[];
  note?: string;
}

const ALL = PERMISSIONS.map((p) => p.key);

export const ROLES: RoleDef[] = [
  {
    key: "admin",
    name: "Administrator",
    arabic: "مدير النظام",
    grants: ALL,
    note: "Every permission there is, maintained by definition rather than by a list somebody has to remember to extend. A trigger makes the last one unremovable.",
  },
  {
    key: "manager",
    name: "Showroom manager",
    arabic: "مدير المعرض",
    grants: [
      "stock:read", "stock:write", "orders:read", "orders:write", "orders:cancel",
      "reservations:read", "reservations:write", "showroom:read", "showroom:write",
      "leads:read", "leads:write", "campaigns:read", "reports:read", "exports:run",
      "staff:read", "deposits:read", "finance:read",
    ],
    note: "Can cancel an order but cannot refund one and can see what a car costs the dealership only through finance:read.",
  },
  {
    key: "sales",
    name: "Sales",
    arabic: "مبيعات",
    grants: [
      "stock:read", "orders:read", "reservations:read", "reservations:write",
      "showroom:read", "showroom:write", "leads:read", "leads:write", "deposits:read",
    ],
    note: "Sees stock without seeing what it cost: stock:read without stock:price. The whole point of splitting them.",
  },
  {
    key: "stock",
    name: "Stock keeper",
    arabic: "أمين المخزون",
    grants: ["stock:read", "stock:write", "stock:price", "reservations:read", "reports:read"],
    note: "The only non-admin role that may set a price.",
  },
  {
    key: "finance",
    name: "Finance",
    arabic: "التمويل",
    grants: ["finance:read", "finance:decide", "orders:read", "reservations:read", "reports:read", "exports:run", "deposits:read"],
    note: "Disjoint from marketing on purpose, neither can see the other's screens.",
  },
  {
    key: "marketing",
    name: "Marketing",
    arabic: "التسويق",
    grants: ["campaigns:read", "campaigns:write", "leads:read", "reports:read", "stock:read"],
  },
  {
    key: "support",
    name: "Customer support",
    arabic: "خدمة العملاء",
    grants: ["orders:read", "leads:read", "leads:write", "showroom:read", "stock:read", "deposits:read"],
  },
  {
    key: "viewer",
    name: "Read only",
    arabic: "قراءة فقط",
    grants: ["stock:read", "orders:read", "reservations:read", "showroom:read", "leads:read", "reports:read"],
  },
];

/* ═══════════════════════════ SCHEDULED JOBS ═════════════════════════════ */

export interface CronDef {
  name: string;
  cron: string;
  human: string;
  /** Runs in one day, from the expression. */
  perDay: number;
  what: string;
  file: string;
}

export const CRON: CronDef[] = [
  {
    name: "staff-alerts",
    cron: "*/5 * * * *",
    human: "every 5 minutes",
    perDay: 288,
    what: "Rings a phone when somebody is waiting or a deposit is about to lapse.",
    file: "20260820_006_alerts_cron.sql",
  },
  {
    name: "test-drive-reminders",
    cron: "*/5 * * * *",
    human: "every 5 minutes",
    perDay: 288,
    what: "Reminds a customer an hour before their appointment.",
    file: "20260818_008_test_drive_reminder_cron.sql",
  },
  {
    name: "expire-store-holds",
    cron: "*/5 * * * *",
    human: "every 5 minutes",
    perDay: 288,
    what: "Releases a car nobody finished paying for and puts it back on the floor.",
    file: "20260818_003_expire_holds_schedule.sql",
  },
  {
    name: "expire-stale-chats",
    cron: "*/15 * * * *",
    human: "every 15 minutes",
    perDay: 96,
    what: "Closes a conversation the agent walked away from, idle more than six hours.",
    file: "20260823_006_expire_stale_chats.sql",
  },
  {
    name: "purge-phone-otps",
    cron: "17 * * * *",
    human: "hourly, at 17 past",
    perDay: 24,
    what: "Throws away used sign-in codes.",
    file: "20260818_005_phone_otp.sql",
  },
  {
    name: "prune-app-errors",
    cron: "17 3 * * *",
    human: "daily, 03:17",
    perDay: 1,
    what: "Keeps the error log readable.",
    file: "20260819_002_error_log.sql",
  },
  {
    name: "prune-alerts-sent",
    cron: "23 3 * * *",
    human: "daily, 03:23",
    perDay: 1,
    what: "Clears the record that stops an alert being sent twice.",
    file: "20260820_006_alerts_cron.sql",
  },
  {
    name: "weekly-digest",
    cron: "0 3 * * 0",
    human: "Sundays, 06:00 Riyadh",
    perDay: 0.14,
    what: "The week in one message.",
    file: "20260820_009_weekly_digest.sql",
  },
];

/* ═══════════════════════════ THE SCHEMA ═════════════════════════════════ */

export interface DomainDef {
  name: string;
  blurb: string;
  tables: string[];
}

export const DOMAINS: DomainDef[] = [
  {
    name: "Stock",
    blurb: "The cars themselves and what they are worth today.",
    tables: ["cars", "vehicle_units", "price_list", "store_addons", "deposit_policies"],
  },
  {
    name: "Money",
    blurb: "Every path a riyal takes and the timer on each one.",
    tables: [
      "store_orders", "store_payments", "store_events", "reservations",
      "reservation_payments", "finance_applications",
    ],
  },
  {
    name: "Demand",
    blurb: "Everybody who showed interest, however they arrived.",
    tables: [
      "leads", "campaign_leads", "registrations", "registration_status_history",
      "events", "showroom_visits", "customer_profiles", "customer_interest",
      "visitor_attribution", "test_drive_bookings", "test_drive_evaluations",
    ],
  },
  {
    name: "Conversation",
    blurb: "The chat console, which is most of the surface area added last.",
    tables: [
      "chat_conversations", "chat_messages", "chat_presence", "chat_tags",
      "chat_conversation_tags", "chat_canned", "chat_triggers", "chat_trigger_fires",
      "chat_calls", "call_signals",
    ],
  },
  {
    name: "Access",
    blurb: "Who may do what and how they proved who they are.",
    tables: ["staff_profiles", "staff_roles", "staff_invites", "roles", "permissions", "role_permissions", "phone_otps"],
  },
  {
    name: "System",
    blurb: "The parts that watch the other parts.",
    tables: ["audit_log", "app_errors", "app_settings", "alerts_sent", "alert_recipients", "web_vitals"],
  },
];

/* ═══════════════════════════ THE PURCHASE ═══════════════════════════════ */

export interface StepDef {
  n: string;
  title: string;
  body: string;
  mechanism: string;
  fn?: string;
}

export const JOURNEY: StepDef[] = [
  {
    n: "01",
    title: "They arrive and are remembered",
    body: "The campaign, the landing page and the device are recorded against the browser before anything is asked of them. No form, no name, just the fact of the arrival, waiting to be joined to a person later.",
    mechanism: "visitor_attribution, written from the browser on first paint",
    fn: "record_attribution()",
  },
  {
    n: "02",
    title: "They ask and get a real answer",
    body: "The assistant answers from the price sheet. If they want a person, the conversation rings in the dashboard with everything already known about them sitting beside it.",
    mechanism: "Gemini 2.5 Flash, grounded on the live price list and forbidden from quoting a figure the site does not also quote",
    fn: "chat_open()",
  },
  {
    n: "03",
    title: "A specific car is put in front of them",
    body: "An agent sends a card into the conversation: that VIN, that colour, today's price and a link that reserves that exact car. Not a model. A car.",
    mechanism: "A message row whose payload is a vehicle_units id",
    fn: "chat_send_car()",
  },
  {
    n: "04",
    title: "They pay a deposit",
    body: "From the website, or across the desk in the showroom. The same function, two doors, one set of rules. The car leaves the floor in the same second, there is no window in which two people can both be sold it.",
    mechanism: "The storefront and the showroom tool both end at one function. The floor's key opens the same lock.",
    fn: "reserve_unit()",
  },
  {
    n: "05",
    title: "The rest is paperwork with a timer",
    body: "Balance, purchase order, handover. Each stage moves the car and the money together, or neither. A hold nobody completes expires on its own and the car goes back on the floor without anybody remembering to do it.",
    mechanism: "advance_store_order() and expire-store-holds sweeping every five minutes",
    fn: "expire_stale_store_orders()",
  },
  {
    n: "06",
    title: "And the numbers were never entered twice",
    body: "The sale is already in stock, in the customer record, in the salesperson's figures and in Sunday's digest, because it was one row all along. Nobody reconciles anything.",
    mechanism: "One write, six readers. This is the whole argument for one database.",
  },
];

/* ═══════════════════════════ THE SPIN ═══════════════════════════════════ */

export const SPIN_ORIGIN =
  "https://skwjfpvgtwcwvoywpzoz.supabase.co/storage/v1/object/public/showcase";

export interface SpinColor {
  id: string;
  name: string;
  swatch: string;
}

export interface SpinCar {
  id: string;
  name: string;
  aspect: number;
  frames: number;
  /** This turntable was shot the other way round; flipping the index puts every car under the same gesture. */
  reverse?: boolean;
  /** The bottom row of every frame carries a cropped-through shadow, dissolve it or a hard grey band shows. */
  cropShadow?: boolean;
  colors: SpinColor[];
  /** The one colour committed to this repo, so the section works with the CDN unreachable. */
  local?: string;
}

export const SPIN_CARS: SpinCar[] = [
  {
    id: "s09",
    name: "S09",
    aspect: 2.3125,
    frames: 72,
    reverse: true,
    local: "mountain-green",
    colors: [
      { id: "mountain-green", name: "Mountain Green", swatch: "#2b5249" },
      { id: "moon-gray", name: "Moon Gray", swatch: "#a3a5a7" },
      { id: "snow-white", name: "Snow White", swatch: "#d5d6d8" },
      { id: "phantom-grey", name: "Phantom Grey", swatch: "#5a5c62" },
      { id: "ocean-blue", name: "Ocean Blue", swatch: "#2a3d58" },
      { id: "starlit-black", name: "Starlit Black", swatch: "#2b2b2e" },
    ],
  },
  {
    id: "s06",
    name: "S06",
    aspect: 2.5761,
    frames: 72,
    reverse: true,
    cropShadow: true,
    colors: [
      { id: "aurora-green", name: "Aurora Green", swatch: "#94b4b4" },
      { id: "snow-white", name: "Snow White", swatch: "#cccccc" },
      { id: "cosmic-silver", name: "Cosmic Silver", swatch: "#848484" },
      { id: "moon-gray", name: "Moon Gray", swatch: "#9c9c9c" },
      { id: "phantom-gray", name: "Phantom Gray", swatch: "#545454" },
      { id: "starlit-black", name: "Starlit Black", swatch: "#141414" },
    ],
  },
  {
    id: "s07",
    name: "S07",
    aspect: 2.3271,
    frames: 72,
    reverse: true,
    colors: [
      { id: "ocean-blue", name: "Ocean Blue", swatch: "#1c2e4a" },
      { id: "pearl-white", name: "Pearl White", swatch: "#ccd0d5" },
      { id: "sky-blue", name: "Sky Blue", swatch: "#526478" },
      { id: "ash-brown", name: "Ash Brown", swatch: "#5f575a" },
      { id: "phantom-grey", name: "Phantom Grey", swatch: "#56575c" },
      { id: "starlit-black", name: "Starlit Black", swatch: "#1f2022" },
    ],
  },
  {
    id: "s08dm",
    name: "S08 DM",
    aspect: 2.164,
    frames: 72,
    colors: [
      { id: "azure-grey", name: "Azure Grey", swatch: "#5c7d86" },
      { id: "morning-mist-white", name: "Morning Mist White", swatch: "#cdd3df" },
      { id: "stream-silver", name: "Stream Silver", swatch: "#8a8382" },
      { id: "interstellar-blue", name: "Interstellar Blue", swatch: "#3b4c69" },
      { id: "midnight-black", name: "Midnight Black", swatch: "#1f2329" },
    ],
  },
];

/* ═══════════════════════════ SECTIONS ═══════════════════════════════════ */

export interface SectionDef {
  id: string;
  n: string;
  label: string;
  desc: string;
}

export const SECTIONS: SectionDef[] = [
  { id: "s01", n: "01", label: "The handover", desc: "What this document is and who it is for" },
  { id: "s02", n: "02", label: "Where it runs", desc: "Jeddah, Western Region" },
  { id: "s03", n: "03", label: "The system", desc: "Four applications over one database" },
  { id: "s04", n: "04", label: "The four applications", desc: "What each one does and who uses it" },
  { id: "s05", n: "05", label: "Seventy-two frames", desc: "The 360 spin, live from the dealership's own storage" },
  { id: "s06", n: "06", label: "The route atlas", desc: "All 72 pages, without a wall of text" },
  { id: "s07", n: "07", label: "Buying a car", desc: "The six steps and the one function underneath" },
  { id: "s08", n: "08", label: "One database", desc: "45 tables, 85 policies, six domains" },
  { id: "s09", n: "09", label: "Who may do what", desc: "25 permissions across 8 roles" },
];
