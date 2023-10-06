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
const post_service_1 = require("../post/post.service");
const comment_model_1 = require("./comment.model");
const comment_errors_1 = require("./comment.errors");
let CommentService = class CommentService {
    constructor(commentModel, postService) {
        this.commentModel = commentModel;
        this.postService = postService;
        this.logger = new common_1.Logger('comment.service');
    }
    async create(postId, content, commenter) {
        const post = await this.postService.getPostById(postId, true);
        const comment = await this.commentModel.createEntity({
            post,
            commenter,
            content: content,
        });
        post.comments.push(comment);
        await post.save();
        return comment;
    }
    async delete(id, commenter) {
        const comment = await this.commentModel.findEntityById(id, [], null, true);
        if (comment.archived) {
            throw new common_1.BadRequestException(comment_errors_1.ALREADY_DELETED);
        }
        await comment.populate('post');
        await comment.populate('commenter');
        await this.markCommentAsArchived(comment, commenter);
        const comments = comment.post.comments.filter(o => o.toString() !== id);
        await this.postService.updatePost(comment.post.id, {
            comments,
            rank: comments.length,
        });
        return true;
    }
    async markCommentAsArchived(comment, commenter) {
        if (comment.commenter.id !== commenter.id) {
            throw new common_1.UnauthorizedException(comment_errors_1.NOT_AUTHORIZED_TO_DELETE_COMMENT);
        }
        await this.commentModel.updateEntity(comment.id, { archived: true });
    }
};
CommentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [comment_model_1.default,
        post_service_1.default])
], CommentService);
exports.default = CommentService;
//# sourceMappingURL=comment.service.js.map