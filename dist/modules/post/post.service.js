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
const config_1 = require("@nestjs/config");
const services_1 = require("../../common/services");
const constants_1 = require("../../common/constants");
const post_model_1 = require("./post.model");
const post_utils_1 = require("./post.utils");
const post_errors_1 = require("./post.errors");
let PostService = class PostService {
    constructor(postModel, configService, fileUploadService) {
        this.postModel = postModel;
        this.configService = configService;
        this.fileUploadService = fileUploadService;
        this.logger = new common_1.Logger('post.service');
    }
    async getPostById(postId, throwError = false) {
        return this.postModel.findEntityById(postId, [], null, throwError);
    }
    async updatePost(postId, update) {
        return this.postModel.updateEntity(postId, update);
    }
    async getAll(limit, cursor) {
        const encryptionKey = this.configService.get('encryptionKey');
        const query = this.buildPaginationQuery(encryptionKey, cursor);
        const sort = { rank: -1, createdAt: -1 };
        const populate = {
            path: 'comments',
            options: { sort: { createdAt: -1 }, limit: 2 },
        };
        const posts = await this.postModel.findEntities(query, 0, limit, [], sort, populate);
        const nextCursor = this.generateNextCursor(encryptionKey, posts, limit);
        return {
            data: posts,
            cursor: nextCursor,
        };
    }
    async create(createPostDTO, image, author) {
        const imageKey = await this.uploadImageToS3(image);
        const regexPattern = /\.(png|bmp|jpeg)/gi;
        const post = await this.savePost(createPostDTO, author, imageKey.replace(regexPattern, '.jpg'));
        return post;
    }
    buildPaginationQuery(encryptionKey, cursor) {
        if (!cursor)
            return {};
        const parsedCursor = (0, post_utils_1.decryptCursor)(cursor, encryptionKey);
        if (!parsedCursor) {
            throw new common_1.BadRequestException(post_errors_1.INVALID_CURSOR_PROVIDED);
        }
        return {
            $or: [
                { rank: { $lt: parsedCursor.rank } },
                {
                    $and: [
                        { rank: parsedCursor.rank },
                        { createdAt: { $lt: parsedCursor.createdAt } },
                    ],
                },
            ],
        };
    }
    generateNextCursor(encryptionKey, posts, limit) {
        const post = posts[limit - 1];
        return posts.length === limit
            ? (0, post_utils_1.generateAndEncryptCursor)(post.rank, post.createdAt, encryptionKey)
            : null;
    }
    async uploadImageToS3(image) {
        return this.fileUploadService.uploadFile(image.buffer, image.originalname, constants_1.POST_IMAGE_BUCKET_NAME);
    }
    async savePost(createPostDTO, author, imageKey) {
        const post = await this.postModel.createEntity({
            ...createPostDTO,
            author,
            image: {
                name: imageKey,
                url: `${constants_1.POST_IMAGE_CLOUDFRONT_DISTRIBUTION_URL}/${imageKey}`,
            },
        });
        return post;
    }
};
PostService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [post_model_1.default,
        config_1.ConfigService,
        services_1.FileUploadService])
], PostService);
exports.default = PostService;
//# sourceMappingURL=post.service.js.map