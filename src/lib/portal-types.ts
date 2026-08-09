export type ClientProfile = {
  id: string;
  email: string;
  role: "admin" | "client";
  full_name: string | null;
  username: string | null;
  company: string | null;
  phone: string | null;
  avatar_url: string | null;
  created_at: string;
};

export type Project = {
  id: string;
  client_id: string;
  title: string;
  description: string | null;
  status: "active" | "paused" | "completed" | "cancelled";
  progress: number;
  deadline: string | null;
  created_at: string;
  updated_at: string;
  phases?: Phase[];
  files?: FileRecord[];
};

export type Phase = {
  id: string;
  project_id: string;
  title: string;
  description: string | null;
  status: "pending" | "active" | "done";
  ord: number;
  created_at: string;
  updated_at: string;
};

export type FileRecord = {
  id: string;
  project_id: string;
  name: string;
  url: string;
  size: number | null;
  mime_type: string | null;
  uploaded_by: "admin" | "client";
  created_at: string;
};

export type Notification = {
  id: string;
  client_id: string;
  title: string;
  message: string | null;
  read: boolean;
  created_at: string;
};

export type ActivityEntry = {
  id: string;
  project_id: string | null;
  client_id: string | null;
  actor: "admin" | "client";
  action: string;
  details: Record<string, string> | null;
  created_at: string;
};

export type ClientWithProjects = ClientProfile & {
  projects: (Project & { phases: Phase[] })[];
};
