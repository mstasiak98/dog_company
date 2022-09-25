import { User } from '../User';

export interface Message {
  id: number;
  thread_id: number;
  user_id: number;
  body: string;
  updated_at: Date;
  sender: User;
}

export interface Thread {
  id: number;
  subject: string;
  created_at: Date;
  updated_at: Date;
  is_unread: boolean;
  thread_creator: User;
}
