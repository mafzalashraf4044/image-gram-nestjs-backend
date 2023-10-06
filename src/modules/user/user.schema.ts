import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';

import { getMongooseSchemaOptions } from '@common/utils';

export type UserDocument = HydratedDocument<User>;

@Schema(getMongooseSchemaOptions())
export class User {
  @Prop({ type: MongooseSchema.Types.ObjectId, auto: true })
  _id: string;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true, unique: true }) // Ensure email is unique
  email: string;

  @Prop({ required: true })
  password: string;

  // Define a virtual getter for 'id'
  get id(): string {
    return this._id.toString();
  }

  @Prop({ default: () => new Date() })
  createdAt: Date;

  @Prop({ default: () => new Date() })
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);

// Define a method to remove _id and convert to plain object
UserSchema.methods.toJSON = function () {
  const userObject = this.toObject();
  delete userObject._id; // Remove the _id field
  delete userObject.password; // Remove the password field
  return userObject;
};
