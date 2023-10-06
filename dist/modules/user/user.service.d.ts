import { RegisterDTO } from '@modules/authentication/dto';
import { UserDocument } from './user.schema';
import UserModel from './user.model';
export default class UserService {
    private readonly userModel;
    private readonly logger;
    constructor(userModel: UserModel);
    getById(id: string, throwError?: boolean): Promise<UserDocument>;
    getByEmail(email: string, throwError?: boolean): Promise<UserDocument>;
    create(registerDTO: RegisterDTO): Promise<UserDocument>;
}
