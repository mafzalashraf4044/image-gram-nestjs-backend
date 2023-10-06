import { JwtService } from '@nestjs/jwt';
import { UserDocument } from '@modules/user/user.schema';
import UsersService from '@modules/user/user.service';
import { RegisterDTO, LogInDTO } from './dto';
import { LoginResponse } from './interfaces';
export default class AuthenticationService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    register(registerDTO: RegisterDTO): Promise<UserDocument>;
    login(loginDTO: LogInDTO): Promise<LoginResponse>;
    private verifyPassword;
}
