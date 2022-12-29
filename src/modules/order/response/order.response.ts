import {Expose} from 'class-transformer';

export default class OrderResponse {
  @Expose()
  public number!: string;

  @Expose()
  public date!: Date;

  @Expose()
  public agent!: string;

  @Expose()
  public status!: string;

  @Expose()
  public milling!: string;

  @Expose()
  public manufacturedDate!: Date;

  @Expose()
  public texture!: string;

  @Expose()
  public patina!: string;
}