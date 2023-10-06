import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { MONGO_DUPLICATE_KEY_ERROR } from '@common/constants';

import { UserDocument } from '@modules/user/user.schema';
import UsersService from '@modules/user/user.service';
import { RegisterDTO, LogInDTO } from './dto';
import { LoginResponse } from './interfaces';
import {
  USER_ALREADY_EXIST,
  INVALID_CREDENTIALS,
} from './authentication.errors';

@Injectable()
export default class AuthenticationService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  /**
   * Register a new user.
   *
   * @param {RegisterDTO} registerDTO - The registration data for the new user.
   * @returns {Promise<UserDocument>} A promise that resolves to the created UserDocument.
   * @throws BadRequestException if the user already exists.
   * @throws InternalServerErrorException if an unexpected error occurs.
   */
  public async register(registerDTO: RegisterDTO): Promise<UserDocument> {
    const hashedPassword = await bcrypt.hash(registerDTO.password, 10);
    try {
      return await this.usersService.create({
        ...registerDTO,
        password: hashedPassword,
      });
    } catch (error: any) {
      if (error?.code === MONGO_DUPLICATE_KEY_ERROR) {
        throw new BadRequestException(USER_ALREADY_EXIST);
      }
    }
  }

  /**
   * Log in a user.
   *
   * @param {LogInDTO} loginDTO - The login credentials (email and password).
   * @returns {Promise<LoginResponse>} A promise that resolves to a LoginResponse containing a JWT token.
   * @throws UnauthorizedException if the credentials are invalid.
   * @throws NotFoundException if the user does not exist
   */
  public async login(loginDTO: LogInDTO): Promise<LoginResponse> {
    const { email, password } = loginDTO;

    const user = await this.usersService.getByEmail(email, true);
    await this.verifyPassword(password, user.password);

    const payload = { username: email, sub: user.id };

    return {
      jwtToken: await this.jwtService.signAsync(payload),
    };
  }

  /**
   * Verify if a password matches the hashed password.
   *
   * @param password - The password to verify.
   * @param hashedPassword - The hashed password to compare against.
   * @throws UnauthorizedException if the passwords do not match.
   */
  private async verifyPassword(
    password: string,
    hashedPassword: string,
  ): Promise<void> {
    const isPasswordMatching = await bcrypt.compare(password, hashedPassword);

    if (!isPasswordMatching) {
      throw new UnauthorizedException(INVALID_CREDENTIALS);
    }
  }
}
