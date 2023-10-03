import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { BaseMongooseModel } from '@common/database';

import { Comment } from './comment.schema';

@Injectable()
export default class CommentModel extends BaseMongooseModel<Comment> {
  constructor(
    @InjectModel(Comment.name) private readonly commentModel: Model<Comment>,
  ) {
    super(commentModel);
  }
}
