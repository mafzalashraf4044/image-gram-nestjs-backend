"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMongooseSchemaOptions = void 0;
const getMongooseSchemaOptions = () => ({
    autoIndex: true,
    toJSON: {
        getters: true,
        virtuals: true,
    },
    versionKey: false,
    timestamps: true,
    toObject: {
        getters: true,
        virtuals: true,
        versionKey: false,
    },
});
exports.getMongooseSchemaOptions = getMongooseSchemaOptions;
//# sourceMappingURL=general.utils.js.map