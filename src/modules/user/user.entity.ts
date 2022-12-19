import {UserType} from '../../types/user.type.js';
import typegoose, {defaultClasses, getModelForClass, modelOptions} from '@typegoose/typegoose';
import {Base} from '@typegoose/typegoose/lib/defaultClasses.js';
import {createSHA256} from '../../utils/common.js';

const {prop} = typegoose;

export interface UserEntity extends Base{}

@modelOptions({
  schemaOptions: {
    collection: 'users'
  }
})
export class UserEntity extends defaultClasses.TimeStamps implements UserType {

  constructor(data: UserType) {
    super();

    this.email = data.email;
    this.name = data.name;
    this.userId1c = data.userId1c;
  }

  @prop({unique: true, required: true, default: ''})
  public email!: string;

  @prop({required: true, default: ''})
  public name!: string;

  @prop({unique: true, required: true, default: ''})
  public userId1c!: string;

  @prop({required: true, default: ''})
  private password!: string;

  public setPassword(password: string, salt: string) {
    this.password = createSHA256(password, salt);
  }

  public getPassword() {
    return this.password;
  }
}

export const UserModel = getModelForClass(UserEntity);