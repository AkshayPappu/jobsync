// job type with title, description, created_at, user_id
export interface Job {
  id: string;
  title: string;
  description: string;
  created_at: Date;
  user_id: number;
}