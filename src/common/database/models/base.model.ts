import { Document, Model } from 'mongoose';
import { NotFoundException } from '@nestjs/common';

export class BaseMongooseModel<T extends Document> {
  constructor(private readonly model: Model<T>) {}

  async findEntities(
    query: any,
    skip: number,
    limit: number,
    projections: string[] = [],
  ): Promise<T[]> {
    const entities = await this.model
      .find(query)
      .skip(skip)
      .limit(limit)
      .populate(projections)
      .exec();
    if (!entities.length) {
      throw new NotFoundException('Model not found.');
    }
    return entities;
  }

  findEntityById(id: string, projections: string[] = []): Promise<T | null> {
    return this.model.findById(id, projections).exec();
  }

  async createEntity(doc: Partial<T>, projections: string[] = []): Promise<T> {
    const entity = await this.model.create(doc);
    return this.model.findById(entity._id, projections);
  }

  async updateEntity(
    id: string,
    update: Partial<T>,
    projections: string[] = [],
  ): Promise<T | null> {
    await this.model.findByIdAndUpdate(id, update, { new: true });
    return this.findEntityById(id, projections);
  }
}
