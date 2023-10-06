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
exports.PaginationTransformPipe = exports.PaginationRequestDTO = void 0;
const common_1 = require("@nestjs/common");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class PaginationRequestDTO {
    constructor() {
        this.limit = 10;
    }
}
exports.PaginationRequestDTO = PaginationRequestDTO;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The cursor for pagination.',
        required: false,
        type: String,
    }),
    (0, class_transformer_1.Type)(() => String),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], PaginationRequestDTO.prototype, "cursor", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The limit for pagination (1-100).',
        required: false,
        type: Number,
        minimum: 1,
        maximum: 100,
        default: 10,
    }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(100),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], PaginationRequestDTO.prototype, "limit", void 0);
let PaginationTransformPipe = class PaginationTransformPipe {
    async transform(dto, { metatype }) {
        if (!metatype) {
            return dto;
        }
        return (0, class_transformer_1.plainToInstance)(metatype, dto);
    }
};
exports.PaginationTransformPipe = PaginationTransformPipe;
exports.PaginationTransformPipe = PaginationTransformPipe = __decorate([
    (0, common_1.Injectable)()
], PaginationTransformPipe);
//# sourceMappingURL=pagination-request.dto.js.map