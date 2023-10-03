import { Injectable, Logger } from '@nestjs/common';

import PostModel from './post.model';

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

  async create(): Promise<any> {
    try {
      const post = await this.postModel.createEntity({
        title: 'My post',
        content: 'Hello world',
      });
      return Promise.resolve(post);
    } catch (error) {
      this.logger.error('create', error);
    }
  }
}
