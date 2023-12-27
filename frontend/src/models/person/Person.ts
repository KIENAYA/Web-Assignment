import { SexType, faker } from '@faker-js/faker';
import { faker as VNFaker } from '@faker-js/faker/locale/vi';
import { SsnGetCenturyCode } from './ssn';

export interface Person {
  firstname: string;
  lastname: string;
  sex: SexType;
  ssn: string;
  birthPlace: string;
  birthDate: Date;
}
