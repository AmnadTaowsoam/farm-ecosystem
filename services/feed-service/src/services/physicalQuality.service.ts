// physicalQuality.service.ts
import { Repository } from 'typeorm';
import { PhysicalQuality } from '../models/physicalQuality.model';

export class PhysicalQualityService {
  constructor(private repo: Repository<PhysicalQuality>) {}

  async create(data: Partial<PhysicalQuality>) {
    const entity = this.repo.create(data);
    return await this.repo.save(entity);
  }

  async findAll() {
    return await this.repo.find();
  }

  async findById(id: number) {
    return await this.repo.findOneBy({ id });
  }

  async update(id: number, data: Partial<PhysicalQuality>) {
    await this.repo.update(id, data);
    return await this.findById(id);
  }

  async delete(id: number) {
    return await this.repo.delete(id);
  }
}
