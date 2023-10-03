import {
  Injectable,
  Logger,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { plainToClass } from 'class-transformer';

import CommentRepository from './comment.repository';

@Injectable()
export default class CommentService {
  private readonly logger: Logger;

  constructor(
    private readonly commentRepository: CommentRepository,
  ) {
    this.logger = new Logger('comment.service');
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
