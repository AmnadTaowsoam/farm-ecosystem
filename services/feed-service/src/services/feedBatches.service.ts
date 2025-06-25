// feedBatches.service.ts
import { Repository } from 'typeorm';
import { FeedBatch } from '../models/feedBatch.model';

export class FeedBatchesService {
  constructor(private repo: Repository<FeedBatch>) {}

  async create(data: Partial<FeedBatch>) {
    const entity = this.repo.create(data);
    return await this.repo.save(entity);
  }

  async findAll() {
    return await this.repo.find();
  }

  async findById(productionDate: Date, feedBatchId: number) {
    return await this.repo.findOneBy({ productionDate, feedBatchId });
  }

  async update(productionDate: Date, feedBatchId: number, data: Partial<FeedBatch>) {
    await this.repo.update({ productionDate, feedBatchId }, data);
    return await this.findById(productionDate, feedBatchId);
  }

  async delete(productionDate: Date, feedBatchId: number) {
    return await this.repo.delete({ productionDate, feedBatchId });
  }
}
