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
import { ApiConsumes, ApiBearerAuth } from '@nestjs/swagger';

import { RequestWithUser } from '@modules/user/interfaces';
import { MAX_FILE_SIZE_IN_BYTES } from '@common/constants';

import PostService from './post.service';
import { PostDocument } from './post.schema';
import {
  CreatePostDTO,
  PaginationRequestDTO,
  PaginationTransformPipe,
} from './dto';
import { GetAllPostResponse } from './interfaces';

@ApiBearerAuth('jwt-token')
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
  @ApiConsumes('multipart/form-data')
  create(
    @Body() createPostDTO: CreatePostDTO,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: MAX_FILE_SIZE_IN_BYTES }),
          new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
        ],
      }),
    )
    image: Express.Multer.File,
    @Req() req: RequestWithUser,
  ): Promise<PostDocument> {
    return this.postService.create(createPostDTO, image, req.user);
  }
}
