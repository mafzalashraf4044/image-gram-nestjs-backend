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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const constants_1 = require("../../common/constants");
const post_service_1 = require("./post.service");
const dto_1 = require("./dto");
let PostController = class PostController {
    constructor(postService) {
        this.postService = postService;
    }
    getAll(pagination) {
        return this.postService.getAll(pagination.limit, pagination.cursor);
    }
    create(createPostDTO, image, req) {
        return this.postService.create(createPostDTO, image, req.user);
    }
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)(new dto_1.PaginationTransformPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.PaginationRequestDTO]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "getAll", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image')),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)(new common_1.ParseFilePipe({
        validators: [
            new common_1.MaxFileSizeValidator({ maxSize: constants_1.MAX_FILE_SIZE_IN_BYTES }),
            new common_1.FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
        ],
    }))),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreatePostDTO, Object, Object]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "create", null);
PostController = __decorate([
    (0, swagger_1.ApiBearerAuth)('jwt-token'),
    (0, common_1.Controller)('post'),
    __metadata("design:paramtypes", [post_service_1.default])
], PostController);
exports.default = PostController;
//# sourceMappingURL=post.controller.js.map