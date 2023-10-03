import { DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';

import { ModelRepository } from '@common/database/repositories';

import PostEntity from './post.entity';

@Injectable()
class PostRepository extends ModelRepository<PostEntity> {
  constructor(private dataSource: DataSource) {
    super(PostEntity, dataSource.createEntityManager());
  }
}

export default PostRepository;
