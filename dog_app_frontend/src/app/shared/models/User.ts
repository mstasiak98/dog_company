import { Photo } from './Photo';

export interface User {
  id: number;
  name: string;
  lastname: string;
  photo: Photo[];
}

export interface UserDetails {
  id: number;
  firstName: string;
  lastName: string;
  city: string;
  street: string;
  phone_number: string;
  description: string;
  photo: Photo[];
}

export interface Comment {
  id: number;
  end_date: Date;
  rating: number;
  comment: string;
  issuer_firstname: string;
  issuer_lastname: string;
}
