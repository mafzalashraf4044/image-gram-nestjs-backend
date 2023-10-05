import {
  Injectable,
  Logger,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';

import { UNABLE_TO_CREATE_COMMENT } from '@common/errors';
import PostModel from '@modules/post/post.model';
import { UserDocument } from '@modules/user/user.schema';

import { Comment } from './comment.schema';
import CommentModel from './comment.model';
import { CreateCommentDTO } from './dto';

@Injectable()
export default class CommentService {
  private readonly logger: Logger;

  constructor(
    private readonly commentModel: CommentModel,
    private readonly postModel: PostModel,
  ) {
    this.logger = new Logger('comment.service');
  }

  async getAll(): Promise<Comment[]> {
    try {
      const comments = await this.commentModel.findEntities({}, 0, 10, [
        'post',
      ]);
      return comments;
    } catch (error) {
      this.logger.error('getAll', error);
    }
  }

  async create(
    createCommentDTO: CreateCommentDTO,
    commenter: UserDocument,
  ): Promise<Comment> {
    try {
      const post = await this.postModel.findEntityById(createCommentDTO.post);
      const comment = await this.commentModel.createEntity({
        post,
        commenter,
        content: createCommentDTO.content,
      });

      // await comment.populate({
      //   path: 'post',
      //   select: '-__v',
      // });

      post.comments.push(comment);
      await post.save();

      return comment;
    } catch (error) {
      this.logger.error('create', error.stack);
      throw new InternalServerErrorException(UNABLE_TO_CREATE_COMMENT);
    }
  }

  async delete(id: string, commenter: UserDocument): Promise<boolean> {
    const comment = await this.commentModel.findEntityById(id);

    await comment.populate('post');
    await comment.populate('commenter');

    console.log('comment', comment);

    if (comment.commenter._id.toString() !== commenter.id) {
      throw new UnauthorizedException();
    }

    const comments = comment.post.comments.filter(o => o._id.toString() !== id);
    await this.commentModel.updateEntity(id, { archived: true });
    await this.postModel.updateEntity(comment.post._id, { comments });

    return true;
  }
}
