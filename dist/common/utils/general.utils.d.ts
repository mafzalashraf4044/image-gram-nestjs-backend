export declare const getMongooseSchemaOptions: () => {
    autoIndex: boolean;
    toJSON: {
        getters: boolean;
        virtuals: boolean;
    };
    versionKey: boolean;
    timestamps: boolean;
    toObject: {
        getters: boolean;
        virtuals: boolean;
        versionKey: boolean;
    };
};
