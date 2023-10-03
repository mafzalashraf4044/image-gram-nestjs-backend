import { Module, Logger } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Post, PostSchema } from './post.schema';
import PostController from './post.controller';
import PostService from './post.service';
import PostModel from './post.model';

@Module({
  controllers: [PostController],
  providers: [PostService, PostModel, Logger],
  imports: [
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
  ],
  exports: [MongooseModule],
})
export default class PostModule {}
