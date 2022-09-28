import { User } from '../User';

export interface Message {
  id: number;
  thread_id: number;
  user_id: number;
  body: string;
  updated_at: Date;
  created_at: Date;
  sender: User;
  thread_name: string;
}

export interface Thread {
  id: number;
  subject: string;
  created_at: Date;
  updated_at: Date;
  is_unread: boolean;
  thread_creator: User;
}

export interface CreateThreadModel {
  subject: string;
  message: string;
  recipient: number;
}
