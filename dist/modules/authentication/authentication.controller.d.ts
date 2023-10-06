import { UserDocument } from '@modules/user/user.schema';
import AuthenticationService from './authentication.service';
import { LogInDTO, RegisterDTO } from './dto';
import { LoginResponse } from './interfaces';
export default class AuthenticationController {
    private readonly authenticationService;
    constructor(authenticationService: AuthenticationService);
    register(registerDTO: RegisterDTO): Promise<UserDocument>;
    signIn(loginDTO: LogInDTO): Promise<LoginResponse>;
}
