import {
  Injectable,
  Logger,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { FileUploadService } from '@common/services';
import { UNABLE_TO_CREATE_POST } from '@common/errors';
import {
  POST_IMAGE_BUCKET_NAME,
  POST_IMAGE_CLOUDFRONT_DISTRIBUTION_URL,
} from '@common/constants';
import { UserDocument } from '@modules/user/user.schema';

import { Post } from './post.schema';
import PostModel from './post.model';
import { CreatePostDTO } from './dto';
import { GetAllPostResponse } from './interfaces';
import { generateAndEncryptCursor, decryptCursor } from './post.utils';

@Injectable()
export default class PostService {
  private readonly logger: Logger;

  constructor(
    private readonly postModel: PostModel,
    private configService: ConfigService,
    private fileUploadService: FileUploadService,
  ) {
    this.logger = new Logger('post.service');
  }

  async getAll(limit: number, cursor?: string): Promise<GetAllPostResponse> {
    try {
      let query = {};

      const encryptionKey = this.configService.get<string>('encryptionKey');

      if (cursor) {
        const { rank, createdAt } = decryptCursor(cursor, encryptionKey);

        query = {
          $or: [
            {
              rank: { $lt: rank },
            },
            {
              $and: [{ rank }, { createdAt: { $lt: createdAt } }],
            },
          ],
        };
      }

      const sort = { rank: -1, createdAt: -1 };
      const posts = await this.postModel.findEntities(
        query,
        0,
        limit,
        [],
        sort,
      );

      const post = posts[limit - 1] as Post;
      const nextCursor =
        posts.length === limit
          ? generateAndEncryptCursor(post.rank, post.createdAt, encryptionKey)
          : null;

      return {
        data: posts,
        cursor: nextCursor,
      };
    } catch (error) {
      this.logger.error('getAll', error);
    }
  }

  async create(
    createPostDTO: CreatePostDTO,
    image: Express.Multer.File,
    author: UserDocument,
  ): Promise<Post> {
    try {
      const key = await this.fileUploadService.uploadFile(
        image.buffer,
        image.originalname,
        POST_IMAGE_BUCKET_NAME,
      );

      const post = await this.postModel.createEntity({
        ...createPostDTO,
        author,
        image: {
          name: key,
          url: `${POST_IMAGE_CLOUDFRONT_DISTRIBUTION_URL}/${key}`,
        },
      });

      return post;
    } catch (error) {
      this.logger.error('create', error.stack);
      throw new InternalServerErrorException(UNABLE_TO_CREATE_POST);
    }
  }
}
