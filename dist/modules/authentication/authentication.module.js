"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const jwt_1 = require("@nestjs/jwt");
const user_module_1 = require("../user/user.module");
const authentication_controller_1 = require("./authentication.controller");
const authentication_service_1 = require("./authentication.service");
const authentication_guard_1 = require("./authentication.guard");
let AuthenticationModule = class AuthenticationModule {
};
AuthenticationModule = __decorate([
    (0, common_1.Module)({
        imports: [
            user_module_1.default,
            jwt_1.JwtModule.registerAsync({
                useFactory: async (configService) => ({
                    global: true,
                    secret: configService.get('jwt.secret'),
                    signOptions: { expiresIn: configService.get('jwt.expiry') },
                }),
                inject: [config_1.ConfigService],
            }),
        ],
        providers: [
            authentication_service_1.default,
            {
                provide: core_1.APP_GUARD,
                useClass: authentication_guard_1.default,
            },
        ],
        controllers: [authentication_controller_1.default],
        exports: [authentication_service_1.default],
    })
], AuthenticationModule);
exports.default = AuthenticationModule;
//# sourceMappingURL=authentication.module.js.map