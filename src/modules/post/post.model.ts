import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { BaseMongooseModel } from '@common/database';

import { Post, PostDocument } from './post.schema';

@Injectable()
export default class PostModel extends BaseMongooseModel<PostDocument> {
  constructor(
    @InjectModel(Post.name) private readonly postModel: Model<PostDocument>,
  ) {
    super(postModel);
  }
}
