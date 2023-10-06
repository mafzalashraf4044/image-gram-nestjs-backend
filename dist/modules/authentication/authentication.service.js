"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
const constants_1 = require("../../common/constants");
const user_service_1 = require("../user/user.service");
const authentication_errors_1 = require("./authentication.errors");
let AuthenticationService = class AuthenticationService {
    constructor(usersService, jwtService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
    }
    async register(registerDTO) {
        const hashedPassword = await bcrypt.hash(registerDTO.password, 10);
        try {
            return await this.usersService.create({
                ...registerDTO,
                password: hashedPassword,
            });
        }
        catch (error) {
            if (error?.code === constants_1.MONGO_DUPLICATE_KEY_ERROR) {
                throw new common_1.BadRequestException(authentication_errors_1.USER_ALREADY_EXIST);
            }
        }
    }
    async login(loginDTO) {
        const { email, password } = loginDTO;
        const user = await this.usersService.getByEmail(email, true);
        await this.verifyPassword(password, user.password);
        const payload = { username: email, sub: user.id };
        return {
            jwtToken: await this.jwtService.signAsync(payload),
        };
    }
    async verifyPassword(password, hashedPassword) {
        const isPasswordMatching = await bcrypt.compare(password, hashedPassword);
        if (!isPasswordMatching) {
            throw new common_1.UnauthorizedException(authentication_errors_1.INVALID_CREDENTIALS);
        }
    }
};
AuthenticationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.default,
        jwt_1.JwtService])
], AuthenticationService);
exports.default = AuthenticationService;
//# sourceMappingURL=authentication.service.js.map