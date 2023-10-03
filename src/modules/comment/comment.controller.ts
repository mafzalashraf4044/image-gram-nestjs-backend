import { Controller, Get, Post } from '@nestjs/common';

import CommentService from './comment.service';

@Controller('comment')
export default class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get()
  getAll(
  ): Promise<boolean> {
    return this.commentService.getAll();
  }

  @Post()
  create(
  ): Promise<boolean> {
    return this.commentService.create();
  }
}
