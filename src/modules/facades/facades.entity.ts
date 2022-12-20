import {defaultClasses, getModelForClass, modelOptions, prop} from '@typegoose/typegoose';

export interface FacadesEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'facades'
  }
})
export class FacadesEntity extends defaultClasses.TimeStamps {
  @prop({required: true})
  public orderId!: string;

  @prop({required: true})
  public type!: string;

  @prop({required: true})
  public direction!: string;

  @prop({required: true})
  public patina!: string;

  @prop({required: true})
  public milling!: string;

  @prop()
  public cutting!: string;

  @prop({required: true})
  public texture!: string;

  @prop({required: true})
  public view!: string;

  @prop({required: true})
  public height!: number;

  @prop({required: true})
  public width!: number;

  @prop({required: true})
  public thickness!: string;

  @prop({required: true})
  public square!: number;

  @prop({required: true})
  public count!: number;

  @prop({required: true})
  public price!: number;

  @prop({required: true})
  public total!: number;
}

export const FacadeModel = getModelForClass(FacadesEntity);