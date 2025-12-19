export type UserProfile = {
  id: string;
  clerk_id: string;
  email: string;
  full_name: string | null;
  class_id: string | null;
  avatar_url: string | null;
  role: "student" | "teacher" | "parent";
  xp: number;
  created_at: string;
};