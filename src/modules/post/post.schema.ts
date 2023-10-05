import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';

import { Comment } from '@modules/comment/comment.schema';
import { User } from '@modules/user/user.schema';
import { getMongooseSchemaOptions } from '@common/utils';

export type PostDocument = HydratedDocument<Post>;

@Schema(getMongooseSchemaOptions())
export class Post {
  @Prop({ type: MongooseSchema.Types.ObjectId, auto: true })
  _id: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  caption: string;

  @Prop()
  rank: number;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'User',
  })
  author: User;

  @Prop({
    default: [],
    type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Comment' }],
  }) // Embed CommentSchema within Post
  comments: Comment[];

  @Prop(
    raw({
      name: { type: String },
      url: { type: String },
    }),
  )
  image: Record<string, any>;

  @Prop({
    defalut: false,
  })
  archived: boolean;

  @Prop({ default: () => new Date() })
  createdAt: Date;

  @Prop({ default: () => new Date() })
  updatedAt: Date;
}

export const PostSchema = SchemaFactory.createForClass(Post);

// Define a pre-save middleware to update the rank field
PostSchema.pre('save', function (next) {
  // Check if the comments array length has changed
  if (this.isModified('comments')) {
    this.rank = this.comments.length;
  }
  next();
});

// Define a method to remove _id and convert to plain object
PostSchema.methods.toJSON = function () {
  const postObject = this.toObject();
  delete postObject._id; // Remove the _id field
  return postObject;
};
