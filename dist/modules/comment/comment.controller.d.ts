import { RequestWithUser } from '@modules/user/interfaces';
import CommentService from './comment.service';
import { CommentDocument } from './comment.schema';
import { CreateCommentDTO } from './dto';
export default class CommentController {
    private readonly commentService;
    constructor(commentService: CommentService);
    create(post: string, createCommentDTO: CreateCommentDTO, req: RequestWithUser): Promise<CommentDocument>;
    delete(id: string, req: RequestWithUser): Promise<boolean>;
}
