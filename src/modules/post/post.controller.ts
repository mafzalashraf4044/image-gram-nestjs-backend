import { Controller, Get, Post } from '@nestjs/common';

import PostService from './post.service';

@Controller('post')
export default class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  getAll(
  ): Promise<boolean> {
    return this.postService.getAll();
  }

  @Post()
  create(
  ): Promise<boolean> {
    return this.postService.create();
  }
}
