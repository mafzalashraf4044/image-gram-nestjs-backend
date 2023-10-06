import { Document, Model } from 'mongoose';
export declare class BaseMongooseModel<T extends Document> {
    private readonly model;
    constructor(model: Model<T>);
    findEntity(query?: any, projections?: string[], throwError?: boolean): Promise<T | null>;
    findEntities(where?: any, skip?: number, limit?: number, projections?: string[], sort?: any, populate?: any): Promise<T[]>;
    findEntityById(id: string, projections?: string[], populate?: any, throwError?: boolean): Promise<T | null>;
    createEntity(doc: Partial<T>, projections?: string[]): Promise<T>;
    updateEntity(id: string, update: Partial<T>, projections?: string[]): Promise<T | null>;
}
