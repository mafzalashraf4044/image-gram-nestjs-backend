/// <reference types="multer" />
import { ConfigService } from '@nestjs/config';
import { FileUploadService } from '@common/services';
import { UserDocument } from '@modules/user/user.schema';
import { PostDocument } from './post.schema';
import PostModel from './post.model';
import { CreatePostDTO } from './dto';
import { GetAllPostResponse } from './interfaces';
export default class PostService {
    private readonly postModel;
    private configService;
    private fileUploadService;
    private readonly logger;
    constructor(postModel: PostModel, configService: ConfigService, fileUploadService: FileUploadService);
    getPostById(postId: string, throwError?: boolean): Promise<PostDocument | null>;
    updatePost(postId: string, update: any): Promise<PostDocument>;
    getAll(limit: number, cursor?: string): Promise<GetAllPostResponse>;
    create(createPostDTO: CreatePostDTO, image: Express.Multer.File, author: UserDocument): Promise<PostDocument>;
    private buildPaginationQuery;
    private generateNextCursor;
    private uploadImageToS3;
    private savePost;
}
