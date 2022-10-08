import { Photo } from '../Photo';

export interface UserAccountFullDetails {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  city: string;
  zip_code: string;
  house_number: string;
  flat_number: string;
  street: string;
  description: string;
  photos: Photo[];
}
