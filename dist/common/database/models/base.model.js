"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseMongooseModel = void 0;
const common_1 = require("@nestjs/common");
class BaseMongooseModel {
    constructor(model) {
        this.model = model;
    }
    async findEntity(query = {}, projections = [], throwError = false) {
        const entity = (await this.model
            .findOne(query, projections)
            .exec());
        if (!entity && throwError) {
            throw new common_1.NotFoundException(`${this.model.modelName} not found.`);
        }
        return entity;
    }
    async findEntities(where = {}, skip = 0, limit = 10, projections = [], sort = { createdAt: -1 }, populate = null) {
        const query = this.model
            .find(where, projections)
            .skip(skip)
            .limit(limit)
            .sort(sort);
        if (populate) {
            query.populate(populate);
        }
        return query.exec();
    }
    async findEntityById(id, projections = [], populate = null, throwError = false) {
        const query = this.model.findById(id, projections);
        if (populate) {
            query.populate(populate);
        }
        const entity = await query.exec();
        if (!entity && throwError) {
            throw new common_1.NotFoundException(`${this.model.modelName} not found.`);
        }
        return entity;
    }
    async createEntity(doc, projections = []) {
        const entity = await this.model.create(doc);
        return this.model.findById(entity.id, projections);
    }
    async updateEntity(id, update, projections = []) {
        await this.model.findByIdAndUpdate(id, update, { new: true });
        return this.findEntityById(id, projections);
    }
}
exports.BaseMongooseModel = BaseMongooseModel;
//# sourceMappingURL=base.model.js.map