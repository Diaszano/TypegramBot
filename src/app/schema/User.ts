export interface User {
  id: string;
  name: string | null;
  telegram_id: number;
  created_at: Date;
  updated_at: Date;
}

export interface UserCreate {
  name: string | null;
  telegram_id: number;
}
