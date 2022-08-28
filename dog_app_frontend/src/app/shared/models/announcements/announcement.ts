import { Activity } from '../dogs/Activity';
import { Owner } from '../Owner';
import { Photo } from '../Photo';

export interface Announcement {
  id: number;
  title: string;
  description: string;
  quantity: number;
  city: string;
  start_date: any;
  end_date: any;
  user: Owner;
  activity: Activity[];
  photo: Photo[];
}
