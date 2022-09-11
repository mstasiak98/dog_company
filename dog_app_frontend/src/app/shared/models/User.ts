import { Photo } from './Photo';

export interface User {
  id: number;
  name: string;
  photo: Photo[];
}
