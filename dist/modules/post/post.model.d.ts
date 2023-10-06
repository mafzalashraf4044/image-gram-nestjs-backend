import { Model } from 'mongoose';
import { BaseMongooseModel } from '@common/database';
import { PostDocument } from './post.schema';
export default class PostModel extends BaseMongooseModel<PostDocument> {
    private readonly postModel;
    constructor(postModel: Model<PostDocument>);
}
