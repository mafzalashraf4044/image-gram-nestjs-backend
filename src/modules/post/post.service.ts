import {
  Injectable,
  Logger,
  InternalServerErrorException,
} from '@nestjs/common';

import { UNABLE_TO_CREATE_POST } from '@common/errors';

import PostModel from './post.model';
import { CreatePostDTO } from './dto';

@Injectable()
export default class PostService {
  private readonly logger: Logger;

  constructor(private readonly postModel: PostModel) {
    this.logger = new Logger('post.service');
  }

  async getAll(): Promise<boolean> {
    try {
      return Promise.resolve(true);
    } catch (error) {
      this.logger.error('getAll', error);
    }
  }

  async create(createPostDTO: CreatePostDTO): Promise<any> {
    try {
      return this.postModel.createEntity(createPostDTO);
    } catch (error) {
      this.logger.error('create', error.stack);
      throw new InternalServerErrorException(UNABLE_TO_CREATE_POST);
    }
  }
}
