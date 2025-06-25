// pelletMillCondition.service.ts
import { Repository } from 'typeorm';
import { PelletMillCondition } from '../models/pelletMillCondition.model';

export class PelletMillConditionService {
  constructor(private repo: Repository<PelletMillCondition>) {}

  async create(data: Partial<PelletMillCondition>) {
    const entity = this.repo.create(data);
    return await this.repo.save(entity);
  }

  async findAll() {
    return await this.repo.find();
  }

  async findById(id: number) {
    return await this.repo.findOneBy({ id });
  }

  async update(id: number, data: Partial<PelletMillCondition>) {
    await this.repo.update(id, data);
    return await this.findById(id);
  }

  async delete(id: number) {
    return await this.repo.delete(id);
  }
}
