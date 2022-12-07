import {FacadeViewEnum} from './facade-view.enum.js';

export type FacadeType = {
  view: FacadeViewEnum
  property: string;
  surface: number;
  count: number;
  cost: number;
  total: number;
}