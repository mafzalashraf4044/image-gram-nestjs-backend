import {
  Controller,
  Get,
  Post,
  Body,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';

import AuthenticationService from './authentication.service';
import { Public } from './authentication.guard';
import { LogInDTO, RegisterDTO } from './dto';

@Controller('auth')
export default class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Public()
  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  async register(@Body() registerDTO: RegisterDTO) {
    return this.authenticationService.register(registerDTO);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() loginDTO: LogInDTO) {
    return this.authenticationService.login(loginDTO);
  }
}
