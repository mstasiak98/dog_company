import { Breed } from './Breed';
import { Size } from './Size';
import { Activity } from './Activity';
import { Availability } from './Availability';
import { Feature } from './Feature';

export interface DogProfile {
  id: number;
  name: string;
  color: string;
  visible: boolean;
  breed: Breed;
  size: Size;
  activity: Activity[];
  availability: Availability[];
  features: Feature[];
}
