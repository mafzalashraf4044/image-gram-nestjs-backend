import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { FileUploadService } from '@common/services';
import {
  POST_IMAGE_BUCKET_NAME,
  POST_IMAGE_CLOUDFRONT_DISTRIBUTION_URL,
} from '@common/constants';
import { UserDocument } from '@modules/user/user.schema';

import { PostDocument } from './post.schema';
import PostModel from './post.model';
import { CreatePostDTO } from './dto';
import { GetAllPostResponse, ParsedCursor } from './interfaces';
import { generateAndEncryptCursor, decryptCursor } from './post.utils';
import { INVALID_CURSOR_PROVIDED } from './post.errors';

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

  /**
   * Find a post by ID.
   *
   * @param {string} postId - The ID of the post to find.
   * @param {boolean} throwError - Wheater or not to throw error if post was not found
   * @returns {Promise<PostDocument | null>} A promise that resolves to the found post or `null` if not found.
   */
  async getPostById(
    postId: string,
    throwError = false,
  ): Promise<PostDocument | null> {
    return this.postModel.findEntityById(postId, [], throwError);
  }

  /**
   * Update a post.
   *
   * @param {string} postId - The ID of the post to update.
   * @param {Partial<PostDocument>} update - Fields to update in the post.
   * @returns {Promise<PostDocument>} A promise that resolves to the updated post.
   */
  async updatePost(
    postId: string,
    update: Partial<PostDocument>,
  ): Promise<PostDocument> {
    return this.postModel.updateEntity(postId, update);
  }

  /**
   * Retrieves a list of posts with pagination.
   *
   * @param {number} limit - The maximum number of posts to retrieve.
   * @param {string} cursor - The cursor for pagination.
   * @returns {Promise<GetAllPostResponse>} A promise that resolves to an object containing the retrieved posts and pagination cursor.
   */
  async getAll(limit: number, cursor?: string): Promise<GetAllPostResponse> {
    const encryptionKey = this.configService.get<string>('encryptionKey');
    const query = this.buildPaginationQuery(encryptionKey, cursor);

    const sort = { rank: -1, createdAt: -1 };
    const populate = {
      path: 'comments',
      options: { sort: { createdAt: -1 }, limit: 2 }, // Sort comments by createdAt in descending order and limit to 2
    };
    const posts = await this.postModel.findEntities(
      query,
      0,
      limit,
      [],
      sort,
      populate,
    );

    const nextCursor = this.generateNextCursor(encryptionKey, posts, limit);

    return {
      data: posts,
      cursor: nextCursor,
    };
  }

  /**
   * Creates a new post with an image.
   *
   * @param {CreatePostDTO} createPostDTO - The DTO for creating a post.
   * @param {Express.Multer.File} image - The image file to upload.
   * @param {UserDocument} author - The author of the post.
   * @returns {Promise<PostDocument>} A promise that resolves to the created post.
   */
  async create(
    createPostDTO: CreatePostDTO,
    image: Express.Multer.File,
    author: UserDocument,
  ): Promise<PostDocument> {
    const imageKey = await this.uploadImageToS3(image);

    const post = await this.savePost(createPostDTO, author, imageKey);

    return post;
  }

  // Private methods

  /**
   * Builds a pagination query for retrieving posts.
   *
   * @private
   * @param {string} encryptionKey - The encryption key.
   * @param {string} cursor - The cursor for pagination.
   * @returns {Object} The pagination query.
   */
  private buildPaginationQuery(encryptionKey: string, cursor?: string) {
    if (!cursor) return {};

    const parsedCursor: ParsedCursor = decryptCursor(cursor, encryptionKey);

    if (!parsedCursor) {
      throw new BadRequestException(INVALID_CURSOR_PROVIDED);
    }

    return {
      $or: [
        { rank: { $lt: parsedCursor.rank } },
        {
          $and: [
            { rank: parsedCursor.rank },
            { createdAt: { $lt: parsedCursor.createdAt } },
          ],
        },
      ],
    };
  }

  /**
   * Generates the next pagination cursor.
   *
   * @private
   * @param {string} encryptionKey - The encryption key.
   * @param {PostDocument[]} posts - The retrieved posts.
   * @param {number} limit - The maximum number of posts per page.
   * @returns {string | null} The next pagination cursor, or null if there are no more pages.
   */
  private generateNextCursor(
    encryptionKey: string,
    posts: PostDocument[],
    limit: number,
  ): string | null {
    const post = posts[limit - 1] as PostDocument;

    return posts.length === limit
      ? generateAndEncryptCursor(post.rank, post.createdAt, encryptionKey)
      : null;
  }

  /**
   * Uploads an image to Amazon S3.
   *
   * @private
   * @param {Express.Multer.File} image - The image file to upload.
   * @returns {Promise<string>} A promise that resolves to the key of the uploaded image.
   */
  private async uploadImageToS3(image: Express.Multer.File): Promise<string> {
    return this.fileUploadService.uploadFile(
      image.buffer,
      image.originalname,
      POST_IMAGE_BUCKET_NAME,
    );
  }

  /**
   * Saves a post with an uploaded image.
   *
   * @private
   * @param {CreatePostDTO} createPostDTO - The DTO for creating a post.
   * @param {UserDocument} author - The author of the post.
   * @param {string} imageKey - The key of the uploaded image.
   * @returns {Promise<PostDocument>} A promise that resolves to the saved post.
   */
  private async savePost(
    createPostDTO: CreatePostDTO,
    author: UserDocument,
    imageKey: string,
  ): Promise<PostDocument> {
    const post = await this.postModel.createEntity({
      ...createPostDTO,
      author,
      image: {
        name: imageKey,
        url: `${POST_IMAGE_CLOUDFRONT_DISTRIBUTION_URL}/${imageKey}`,
      },
    });

    return post;
  }
}
