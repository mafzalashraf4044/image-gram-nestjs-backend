import { Controller, Post, Delete, Body, Req, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiParam } from '@nestjs/swagger';

import { RequestWithUser } from '@modules/user/interfaces';

import CommentService from './comment.service';
import { CommentDocument } from './comment.schema';
import { CreateCommentDTO } from './dto';

@ApiBearerAuth('jwt-token')
@Controller()
export default class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post('post/:post/comment')
  @ApiParam({ name: 'post', type: 'string' })
  create(
    @Param('post') post: string,
    @Body() createCommentDTO: CreateCommentDTO,
    @Req() req: RequestWithUser,
  ): Promise<CommentDocument> {
    return this.commentService.create(post, createCommentDTO.content, req.user);
  }

  @Delete('comment/:id')
  delete(
    @Param('id') id: string,
    @Req() req: RequestWithUser,
  ): Promise<boolean> {
    return this.commentService.delete(id, req.user);
  }
}
