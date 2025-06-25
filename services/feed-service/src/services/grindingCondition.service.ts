// grindingCondition.service.ts
import { Repository } from 'typeorm';
import { GrindingCondition } from '../models/grindingCondition.model';

export class GrindingConditionService {
  constructor(private repo: Repository<GrindingCondition>) {}

  async create(data: Partial<GrindingCondition>) {
    const entity = this.repo.create(data);
    return await this.repo.save(entity);
  }

  async findAll() {
    return await this.repo.find();
  }

  async findById(id: number) {
    return await this.repo.findOneBy({ id });
  }

  async update(id: number, data: Partial<GrindingCondition>) {
    await this.repo.update(id, data);
    return await this.findById(id);
  }

  async delete(id: number) {
    return await this.repo.delete(id);
  }
}
