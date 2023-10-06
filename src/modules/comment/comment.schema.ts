import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';

import { Post } from '@modules/post/post.schema';
import { User } from '@modules/user/user.schema';
import { getMongooseSchemaOptions } from '@common/utils';

export type CommentDocument = HydratedDocument<Comment>;

@Schema(getMongooseSchemaOptions())
export class Comment {
  @Prop({ type: MongooseSchema.Types.ObjectId, auto: true })
  _id: string;

  @Prop({ required: true })
  content: string;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Post',
  }) // Embed PostSchema within Comment
  post: Post;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'User',
  })
  commenter: User;

  @Prop({
    defalut: false,
  })
  archived: boolean;

  // Define a virtual getter for 'id'
  get id(): string {
    return this._id.toString();
  }

  @Prop({ default: () => new Date() })
  createdAt: Date;

  @Prop({ default: () => new Date() })
  updatedAt: Date;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);

// Define a method to remove _id and convert to plain object
CommentSchema.methods.toJSON = function () {
  const commentObject = this.toObject();
  delete commentObject._id; // Remove the _id field
  return commentObject;
};
