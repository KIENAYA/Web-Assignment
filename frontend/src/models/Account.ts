import { Role } from './Role';
import { Person } from './person/Person';

export interface Account {
  profile: Person;
  _id: string;
  username: string;
  password: string;
  role: Role;
}
