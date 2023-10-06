import { Model } from 'mongoose';
import { BaseMongooseModel } from '@common/database';
import { CommentDocument } from './comment.schema';
export default class CommentModel extends BaseMongooseModel<CommentDocument> {
    private readonly commentModel;
    constructor(commentModel: Model<CommentDocument>);
}
