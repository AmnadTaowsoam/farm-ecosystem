// services/external-factor-service/src/services/externalFactors.service.ts

import { Repository } from 'typeorm';
import { AppDataSource } from '../utils/dataSource';
import { ExternalFactors } from '../models/externalFactors.model';

export class ExternalFactorsService {
  private repo: Repository<ExternalFactors>;

  constructor() {
    this.repo = AppDataSource.getRepository(ExternalFactors);
  }

  async create(data: Partial<ExternalFactors>): Promise<ExternalFactors> {
    return this.repo.save(data);
  }

  async findAll(): Promise<ExternalFactors[]> {
    return this.repo.find();
  }

  async findById(id: number): Promise<ExternalFactors | null> {
    return this.repo.findOneBy({ id });
  }

  async update(id: number, data: Partial<ExternalFactors>): Promise<ExternalFactors> {
    await this.repo.update(id, data);
    const updated = await this.findById(id);
    if (!updated) throw new Error('ExternalFactors not found');
    return updated;
  }

  async delete(id: number): Promise<void> {
    await this.repo.delete(id);
  }
}

export default new ExternalFactorsService();
