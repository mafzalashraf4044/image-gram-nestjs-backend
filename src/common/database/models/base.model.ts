import { Document, Model } from 'mongoose';
import { NotFoundException } from '@nestjs/common';
export class BaseMongooseModel<T extends Document> {
  constructor(private readonly model: Model<T>) {}

  async findEntity(
    query: any = {},
    projections: string[] = [],
    throwError = false,
  ): Promise<T | null> {
    const entity = (await this.model
      .findOne(query, projections)
      .exec()) as T | null;

    if (!entity && throwError) {
      throw new NotFoundException(`${this.model.modelName} not found.`);
    }

    return entity;
  }

  async findEntities(
    where: any = {},
    skip = 0,
    limit = 10,
    projections: string[] = [],
    sort: any = { createdAt: -1 },
    populate: any = null,
  ): Promise<T[]> {
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

  async findEntityById(
    id: string,
    projections: string[] = [],
    populate: any = null,
    throwError = false,
  ): Promise<T | null> {
    const query = this.model.findById(id, projections);

    if (populate) {
      query.populate(populate);
    }

    const entity = await query.exec();

    if (!entity && throwError) {
      throw new NotFoundException(`${this.model.modelName} not found.`);
    }

    return entity;
  }

  async createEntity(doc: Partial<T>, projections: string[] = []): Promise<T> {
    const entity = await this.model.create(doc);
    return this.model.findById(entity.id, projections);
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
