import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Req,
  Param,
} from '@nestjs/common';

import { RequestWithUser } from '@modules/user/interfaces';

import CommentService from './comment.service';
import { Comment } from './comment.schema';
import { CreateCommentDTO } from './dto';

@Controller('comment')
export default class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get()
  getAll(): Promise<Comment[]> {
    return this.commentService.getAll();
  }

  @Post()
  create(
    @Body() createCommentDTO: CreateCommentDTO,
    @Req() req: RequestWithUser,
  ): Promise<Comment> {
    return this.commentService.create(createCommentDTO, req.user);
  }

  @Delete(':id')
  delete(
    @Param('id') id: string,
    @Req() req: RequestWithUser,
  ): Promise<boolean> {
    return this.commentService.delete(id, req.user);
  }
}
