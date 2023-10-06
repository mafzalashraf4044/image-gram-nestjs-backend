import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';

import PostService from '@modules/post/post.service';
import { UserDocument } from '@modules/user/user.schema';

import { CommentDocument } from './comment.schema';
import CommentModel from './comment.model';
import { NOT_AUTHORIZED_TO_DELETE_COMMENT } from './comment.errors';

@Injectable()
export default class CommentService {
  private readonly logger: Logger;

  constructor(
    private readonly commentModel: CommentModel,
    private readonly postService: PostService,
  ) {
    this.logger = new Logger('comment.service');
  }

  /**
   * Create a new comment.
   *
   * @param {string} postId - The ID of the post.
   * @param {string} content - The content of the comment
   * @param {UserDocument} commenter - The user creating the comment.
   * @returns {Promise<CommentDocument>} A promise that resolves to the created comment.
   */
  async create(
    postId: string,
    content: string,
    commenter: UserDocument,
  ): Promise<CommentDocument> {
    const post = await this.postService.getPostById(postId, true);

    const comment = await this.commentModel.createEntity({
      post,
      commenter,
      content: content,
    });

    post.comments.push(comment);
    await post.save();

    return comment;
  }

  /**
   * Delete a comment by its ID.
   *
   * @param {string} id - The ID of the comment to delete.
   * @param {UserDocument} commenter - The user attempting to delete the comment.
   * @returns {Promise<boolean>} A promise that resolves to `true` if the comment is deleted successfully.
   * @throws {NotFoundException} If the comment is not found.
   * @throws {UnauthorizedException} If the user is not authorized to delete the comment.
   */
  async delete(id: string, commenter: UserDocument): Promise<boolean> {
    const comment = await this.commentModel.findEntityById(id, [], true);

    await comment.populate('post');
    await comment.populate('commenter');

    await this.markCommentAsArchived(comment, commenter);

    const comments = comment.post.comments.filter(o => o.id !== id);
    await this.postService.updatePost(comment.post.id, { comments });

    return true;
  }

  // Private methods

  /**
   * Update the archived field of comment to true
   *
   * @private
   * @param {CommentDocument} comment - The comment to update.
   * @param {UserDocument} commenter - The user attempting to delete the comment.
   * @returns {Promise<Post>} A promise that resolves to the saved post.
   */
  private async markCommentAsArchived(
    comment: CommentDocument,
    commenter: UserDocument,
  ): Promise<void> {
    if (comment.commenter.id !== commenter.id) {
      throw new UnauthorizedException(NOT_AUTHORIZED_TO_DELETE_COMMENT);
    }

    await this.commentModel.updateEntity(comment.id, { archived: true });
  }
}
