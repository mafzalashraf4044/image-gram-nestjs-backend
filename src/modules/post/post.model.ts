import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { BaseMongooseModel } from '@common/database';

import { Post } from './post.schema';

@Injectable()
export default class PostModel extends BaseMongooseModel<Post> {
  constructor(@InjectModel(Post.name) private readonly postModel: Model<Post>) {
    super(postModel);
  }
}
