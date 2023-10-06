/// <reference types="multer" />
import { RequestWithUser } from '@modules/user/interfaces';
import PostService from './post.service';
import { PostDocument } from './post.schema';
import { CreatePostDTO, PaginationRequestDTO } from './dto';
import { GetAllPostResponse } from './interfaces';
export default class PostController {
    private readonly postService;
    constructor(postService: PostService);
    getAll(pagination: PaginationRequestDTO): Promise<GetAllPostResponse>;
    create(createPostDTO: CreatePostDTO, image: Express.Multer.File, req: RequestWithUser): Promise<PostDocument>;
}
