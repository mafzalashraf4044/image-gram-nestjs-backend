import {
  Controller,
  Get,
  Post as HTTPPost,
  Body,
  Query,
  Req,
  UploadedFile,
  UseInterceptors,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { RequestWithUser } from '@modules/user/interfaces';

import PostService from './post.service';
import { Post } from './post.schema';
import {
  CreatePostDTO,
  PaginationRequestDTO,
  PaginationTransformPipe,
} from './dto';
import { GetAllPostResponse } from './interfaces';

@Controller('post')
export default class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  getAll(
    @Query(new PaginationTransformPipe()) pagination: PaginationRequestDTO,
  ): Promise<GetAllPostResponse> {
    return this.postService.getAll(pagination.limit, pagination.cursor);
  }

  @HTTPPost()
  @UseInterceptors(FileInterceptor('image'))
  create(
    @Body() createPostDTO: CreatePostDTO,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1000000 }),
          new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
        ],
      }),
    )
    image: Express.Multer.File,
    @Req() req: RequestWithUser,
  ): Promise<Post> {
    return this.postService.create(createPostDTO, image, req.user);
  }
}
