import { Module, Logger } from '@nestjs/common';

import CommentEntity from './comment.entity';
import CommentController from './comment.controller';
import CommentService from './comment.service';
import CommentRepository from './comment.repository';

@Module({
  controllers: [CommentController],
  providers: [
    CommentService,
    CommentRepository,
    Logger,
  ],
  imports: [],
  exports: [],
})
export default class BulkEmailJobModule {}
