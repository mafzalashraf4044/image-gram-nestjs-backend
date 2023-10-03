import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema, Document } from 'mongoose';

import { Comment } from '@modules/comment/comment.schema';

export type PostDocument = HydratedDocument<Post>;

@Schema()
export class Post extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  caption: string;

  @Prop()
  rank: number;

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Comment' }] }) // Embed CommentSchema within Post
  comments: Comment[];

  @Prop({ default: () => new Date() })
  createdAt: Date;

  @Prop({ default: () => new Date() })
  updatedAt: Date;
}

export const PostSchema = SchemaFactory.createForClass(Post);

// Define a pre-save middleware to update the rank field
PostSchema.pre('save', function (next) {
  this.updatedAt = new Date();

  // Check if the comments array length has changed
  if (this.isModified('comments')) {
    this.rank = this.comments.length;
  }
  next();
});

// Define a method to remove __v and convert to plain object
PostSchema.methods.toJSON = function () {
  const postObject = this.toObject();
  delete postObject.__v; // Remove the __v field
  return postObject;
};
