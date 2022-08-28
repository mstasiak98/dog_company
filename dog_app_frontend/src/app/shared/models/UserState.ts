export interface UserState {
  authenticated: boolean;
  user: {
    userId: number;
    userName: string;
  };
}
