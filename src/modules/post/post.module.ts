import { Module, Logger } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import PostEntity from './post.entity';
import PostController from './post.controller';
import PostService from './post.service';
import PostRepository from './post.repository';

@Module({
  controllers: [PostController],
  providers: [
    PostService,
    PostRepository,
    Logger,
  ],
  imports: [TypeOrmModule.forFeature([PostEntity])],
  exports: [TypeOrmModule],
})
export default class BulkEmailJobModule {}
