"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const services_1 = require("../../common/services");
const post_schema_1 = require("./post.schema");
const post_controller_1 = require("./post.controller");
const post_service_1 = require("./post.service");
const post_model_1 = require("./post.model");
let PostModule = class PostModule {
};
PostModule = __decorate([
    (0, common_1.Module)({
        controllers: [post_controller_1.default],
        providers: [post_service_1.default, post_model_1.default, services_1.FileUploadService, common_1.Logger],
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: post_schema_1.Post.name, schema: post_schema_1.PostSchema }]),
        ],
        exports: [mongoose_1.MongooseModule, post_service_1.default],
    })
], PostModule);
exports.default = PostModule;
//# sourceMappingURL=post.module.js.map