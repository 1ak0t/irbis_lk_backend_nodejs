import {prop} from '@typegoose/typegoose';
import {Expose} from 'class-transformer';

export default class FacadesResponse {
  @Expose()
  public type!: string;

  @Expose()
  public direction!: string;

  @Expose()
  public patina!: string;

  @Expose()
  public milling!: string;

  @prop()
  public cutting!: string;

  @Expose()
  public texture!: string;

  @Expose()
  public view!: string;

  @Expose()
  public height!: number;

  @Expose()
  public width!: number;

  @Expose()
  public thickness!: string;

  @Expose()
  public square!: number;

  @Expose()
  public count!: number;

  @Expose()
  public price!: number;

  @Expose()
  public total!: number;
}