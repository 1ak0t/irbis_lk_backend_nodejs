import {defaultClasses, getModelForClass, modelOptions, prop, Ref} from '@typegoose/typegoose';
import {UserEntity} from '../user/user.entity.js';

export interface OrderEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'orders'
  }
})
export class OrderEntity extends defaultClasses.TimeStamps {
  @prop({required: true, trim: true})
  public number!: string;

  @prop({required: true})
  public date!: Date;

  @prop({required: true})
  public agent!: string;

  @prop({required: true})
  public status!: string;

  @prop({required: true})
  public manufacturedDate!: Date;

  @prop({required: true})
  public texture!: string;

  @prop({required: true})
  public patina!: string;

  @prop({required: true})
  public userId1c!: string;

  @prop({
    required: true,
    ref: UserEntity,
  })
  public userId!: Ref<UserEntity>;
}

export const OrderModel = getModelForClass(OrderEntity);