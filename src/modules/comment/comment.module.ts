import { Module, Logger } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Comment, CommentSchema } from './comment.schema';
import CommentController from './comment.controller';
import CommentService from './comment.service';
import CommentModel from './comment.model';

@Module({
  controllers: [CommentController],
  providers: [CommentService, CommentModel, Logger],
  imports: [
    MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }]),
  ],
  exports: [MongooseModule],
})
export default class CommentModule {}
