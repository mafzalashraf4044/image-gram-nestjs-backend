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

  @Prop({
    default: false,
  })
  archived: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);

// Define a method to remove _id and convert to plain object
UserSchema.methods.toJSON = function () {
  const userObject = this.toObject();
  delete userObject._id; // Remove the _id field
  delete userObject.password; // Remove the password field
  return userObject;
};
