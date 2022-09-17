import { Breed } from './Breed';
import { Size } from './Size';
import { Activity } from './Activity';
import { Availability } from './Availability';
import { Feature } from './Feature';
import { Photo } from '../Photo';

export interface DogProfile {
  id: number;
  name: string;
  color: string;
  visible: boolean;
  breed: Breed;

  size: Size;
  activity: Activity[];
  availability: Availability[];
  feature: Feature[];
  description: string;
  photos: Photo[];
}
