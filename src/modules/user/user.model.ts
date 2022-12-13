import {UserType} from '../../types/user.type.js';
import mongoose from 'mongoose';


export interface UserDocument extends UserType, mongoose.Document {}

const userSchema = new mongoose.Schema({
  email: String,
  name: String,
  userId1c: String
});

export const UserModel = mongoose.model<UserDocument>('User', userSchema);