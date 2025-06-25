// mixingCondition.service.ts
import { Repository } from 'typeorm';
import { MixingCondition } from '../models/mixingCondition.model';

export class MixingConditionService {
  constructor(private repo: Repository<MixingCondition>) {}

  async create(data: Partial<MixingCondition>) {
    const entity = this.repo.create(data);
    return await this.repo.save(entity);
  }

  async findAll() {
    return await this.repo.find();
  }

  async findById(id: number) {
    return await this.repo.findOneBy({ id });
  }

  async update(id: number, data: Partial<MixingCondition>) {
    await this.repo.update(id, data);
    return await this.findById(id);
  }

  async delete(id: number) {
    return await this.repo.delete(id);
  }
}
