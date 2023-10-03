import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Document } from 'mongoose';

export type CommentDocument = HydratedDocument<Comment>;

@Schema()
export class Comment extends Document {
  @Prop({ required: true })
  content: string;

  @Prop({ default: () => new Date() })
  createdAt: Date;

  @Prop({ default: () => new Date() })
  updatedAt: Date;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);

// Define a pre-save middleware to update the rank field
CommentSchema.pre('save', function (next) {
  this.updatedAt = new Date();

  next();
});

// Define a method to remove __v and convert to plain object
CommentSchema.methods.toJSON = function () {
  const postObject = this.toObject();
  delete postObject.__v; // Remove the __v field
  return postObject;
};