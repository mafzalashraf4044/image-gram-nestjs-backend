export const wait = (time: number) => {
  return new Promise<void>(resolve => setTimeout(resolve, time));
};

export const getMongooseSchemaOptions = () => ({
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