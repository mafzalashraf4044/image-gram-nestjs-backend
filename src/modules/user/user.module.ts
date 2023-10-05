import { Module, Logger } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { User, UserSchema } from './user.schema';
import UserService from './user.service';
import UserModel from './user.model';

@Module({
  controllers: [],
  providers: [UserService, UserModel, Logger],
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  exports: [MongooseModule, UserService],
})
export default class UserModule {}
