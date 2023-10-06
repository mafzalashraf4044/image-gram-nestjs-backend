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
const swagger_1 = require("@nestjs/swagger");
const comment_service_1 = require("./comment.service");
const dto_1 = require("./dto");
let CommentController = class CommentController {
    constructor(commentService) {
        this.commentService = commentService;
    }
    create(post, createCommentDTO, req) {
        return this.commentService.create(post, createCommentDTO.content, req.user);
    }
    delete(id, req) {
        return this.commentService.delete(id, req.user);
    }
};
__decorate([
    (0, common_1.Post)('post/:post/comment'),
    (0, swagger_1.ApiParam)({ name: 'post', type: 'string' }),
    __param(0, (0, common_1.Param)('post')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.CreateCommentDTO, Object]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "create", null);
__decorate([
    (0, common_1.Delete)('comment/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "delete", null);
CommentController = __decorate([
    (0, swagger_1.ApiBearerAuth)('jwt-token'),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [comment_service_1.default])
], CommentController);
exports.default = CommentController;
//# sourceMappingURL=comment.controller.js.map