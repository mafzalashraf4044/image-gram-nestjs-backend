import { Controller, Get, Post as HTTPPost, Body } from '@nestjs/common';

import PostService from './post.service';
import { Post } from './post.schema';
import { CreatePostDTO } from './dto';

@Controller('post')
export default class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  getAll(): Promise<boolean> {
    return this.postService.getAll();
  }

  @HTTPPost()
  create(@Body() createPostDTO: CreatePostDTO): Promise<Post> {
    return this.postService.create(createPostDTO);
  }
}
