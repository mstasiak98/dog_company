import { Activity } from '../dogs/Activity';
import { User } from '../User';
import { CareState } from './CareState';
import { Breed } from '../dogs/Breed';

export interface DogCare {
  id: number;
  start_date: Date;
  end_date: Date;
  additional_info: string;
  siblings: boolean;
  rating: number;
  comment: string;
  activity: Activity;
  guardian: User;
  owner: User;
  state: CareState;
  dog_name: string;
  dog_breed: Breed;
  dog_profile_id: number;
  announcement_id: number;
}
