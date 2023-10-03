import { DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';

import { ModelRepository } from '@common/database/repositories';

import CommentEntity from './comment.entity';

@Injectable()
class CommentRepository extends ModelRepository<CommentEntity> {
  constructor(private dataSource: DataSource) {
    super(CommentEntity, dataSource.createEntityManager());
  }
}

export default CommentRepository;
