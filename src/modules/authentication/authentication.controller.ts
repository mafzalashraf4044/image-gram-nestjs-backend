import { Controller, Post, Body, HttpStatus, HttpCode } from '@nestjs/common';

import { UserDocument } from '@modules/user/user.schema';

import AuthenticationService from './authentication.service';
import { Public } from './authentication.guard';
import { LogInDTO, RegisterDTO } from './dto';
import { LoginResponse } from './interfaces';

@Controller('auth')
export default class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Public()
  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  async register(@Body() registerDTO: RegisterDTO): Promise<UserDocument> {
    return this.authenticationService.register(registerDTO);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() loginDTO: LogInDTO): Promise<LoginResponse> {
    return this.authenticationService.login(loginDTO);
  }
}
