import {UserType} from './user.type.js';

export type OrderType = {
  number: string;
  user: UserType;
  date: Date;
  agent: string;
  status: string;
  milling: string;
  manufacturedDate: Date;
  texture: string;
  patina: string;
}