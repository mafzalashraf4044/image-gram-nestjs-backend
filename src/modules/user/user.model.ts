import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { BaseMongooseModel } from '@common/database';

import { User, UserDocument } from './user.schema';

@Injectable()
export default class UserModel extends BaseMongooseModel<UserDocument> {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {
    super(userModel);
  }
}
