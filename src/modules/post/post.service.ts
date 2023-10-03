import {
  Injectable,
  Logger,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { plainToClass } from 'class-transformer';

import PostRepository from './post.repository';

@Injectable()
export default class PostService {
  private readonly logger: Logger;

  constructor(
    private readonly postRepository: PostRepository,
  ) {
    this.logger = new Logger('post.service');
  }

  async getAll(): Promise<boolean> {
    try {
      return Promise.resolve(true);
    } catch (error) {
      this.logger.error('getAll', error);
    }
  }

  async create(): Promise<boolean> {
    try {
      return Promise.resolve(true);
    } catch (error) {
      this.logger.error('create', error);
    }
  }
}
