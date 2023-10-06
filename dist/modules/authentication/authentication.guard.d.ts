import { CanActivate, ExecutionContext } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import UsersService from '@modules/user/user.service';
export declare const Public: () => import("@nestjs/common").CustomDecorator<string>;
export default class AuthenticationGuard implements CanActivate {
    private jwtService;
    private reflector;
    private configService;
    private userService;
    constructor(jwtService: JwtService, reflector: Reflector, configService: ConfigService, userService: UsersService);
    canActivate(context: ExecutionContext): Promise<boolean>;
    private extractTokenFromHeader;
}
