import PostService from '@modules/post/post.service';
import { UserDocument } from '@modules/user/user.schema';
import { CommentDocument } from './comment.schema';
import CommentModel from './comment.model';
export default class CommentService {
    private readonly commentModel;
    private readonly postService;
    private readonly logger;
    constructor(commentModel: CommentModel, postService: PostService);
    create(postId: string, content: string, commenter: UserDocument): Promise<CommentDocument>;
    delete(id: string, commenter: UserDocument): Promise<boolean>;
    private markCommentAsArchived;
}
