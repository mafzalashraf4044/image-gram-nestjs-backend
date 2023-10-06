import { Model } from 'mongoose';
import { BaseMongooseModel } from '@common/database';
import { UserDocument } from './user.schema';
export default class UserModel extends BaseMongooseModel<UserDocument> {
    private readonly userModel;
    constructor(userModel: Model<UserDocument>);
}
