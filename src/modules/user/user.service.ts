import { Injectable, Logger } from '@nestjs/common';

import { RegisterDTO } from '@modules/authentication/dto';

import { UserDocument } from './user.schema';
import UserModel from './user.model';

@Injectable()
export default class UserService {
  private readonly logger: Logger;

  constructor(private readonly userModel: UserModel) {
    this.logger = new Logger('user.service');
  }

  /**
   * Get a user by their ID.
   *
   * @param id - The user's ID.
   * @param {boolean} throwError - Wheater or not to throw error if post was not found
   * @returns A promise that resolves to a UserDocument.
   */
  async getById(id: string, throwError = false): Promise<UserDocument> {
    return this.userModel.findEntityById(id, [], null, throwError);
  }

  /**
   * Get a user by their email address.
   *
   * @param email - The user's email address.
   * @param {boolean} throwError - Wheater or not to throw error if post was not found
   * @returns {Promise<UserDocument | null>} A promise that resolves to the found user or `null` if not found.
   */
  async getByEmail(email: string, throwError = false): Promise<UserDocument> {
    return this.userModel.findEntity({ email }, [], throwError);
  }

  /**
   * Create a new user based on the provided registration data.
   *
   * @param registerDTO - The registration data for the new user.
   * @returns A promise that resolves to a UserDocument.
   */
  async create(registerDTO: RegisterDTO): Promise<UserDocument> {
    return this.userModel.createEntity(registerDTO);
  }
}
