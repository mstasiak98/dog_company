import { User } from './User';

export interface UserState {
  authenticated: boolean;
  user: User;
  /*user: {
    userId: number;
    userName: string;
  };*/
}
