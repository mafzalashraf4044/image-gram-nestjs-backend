import { Module, Logger } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { FileUploadService } from '@common/services';

import { Post, PostSchema } from './post.schema';
import PostController from './post.controller';
import PostService from './post.service';
import PostModel from './post.model';

@Module({
  controllers: [PostController],
  providers: [PostService, PostModel, FileUploadService, Logger],
  imports: [
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
  ],
  exports: [MongooseModule, PostService],
})
export default class PostModule {}
