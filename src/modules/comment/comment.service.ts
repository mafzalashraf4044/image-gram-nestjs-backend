import { Injectable, Logger } from '@nestjs/common';

import CommentModel from './comment.model';

@Injectable()
export default class CommentService {
  private readonly logger: Logger;

  constructor(private readonly commentModel: CommentModel) {
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
