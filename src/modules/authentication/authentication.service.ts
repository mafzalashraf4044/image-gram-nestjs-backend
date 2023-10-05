import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { MONGO_DUPLICATE_KEY_ERROR } from '@common/constants';
import {
  USER_ALREADY_EXIST,
  SOMETHING_WENT_WRONG,
  INVALID_CREDENTIALS,
} from '@common/errors';

import UsersService from '@modules/user/user.service';
import { RegisterDTO, LogInDTO } from './dto';

@Injectable()
export default class AuthenticationService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  public async register(registerDTO: RegisterDTO) {
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

      throw new InternalServerErrorException(SOMETHING_WENT_WRONG);
    }
  }

  public async login(loginDTO: LogInDTO) {
    try {
      const { email, password } = loginDTO;

      const user = await this.usersService.getByEmail(email);
      await this.verifyPassword(password, user.password);

      const payload = { username: email, sub: user._id };
      return {
        jwtToken: await this.jwtService.signAsync(payload),
      };
    } catch (error) {
      throw new UnauthorizedException(INVALID_CREDENTIALS);
    }
  }

  private async verifyPassword(password: string, hashedPassword: string) {
    const isPasswordMatching = await bcrypt.compare(password, hashedPassword);
    if (!isPasswordMatching) {
      throw new UnauthorizedException(INVALID_CREDENTIALS);
    }
  }
}
