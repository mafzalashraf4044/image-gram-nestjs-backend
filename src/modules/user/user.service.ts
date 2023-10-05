import { Injectable, Logger } from '@nestjs/common';

import { RegisterDTO } from '@modules/authentication/dto';

import { User } from './user.schema';
import UserModel from './user.model';

@Injectable()
export default class UserService {
  private readonly logger: Logger;

  constructor(private readonly userModel: UserModel) {
    this.logger = new Logger('user.service');
  }

  async getById(id: string): Promise<User> {
    return this.userModel.findEntityById(id);
  }

  async getByEmail(email: string): Promise<User> {
    return this.userModel.findEntity({ email });
  }

  async create(registerDTO: RegisterDTO): Promise<User> {
    return this.userModel.createEntity(registerDTO);
  }
}
