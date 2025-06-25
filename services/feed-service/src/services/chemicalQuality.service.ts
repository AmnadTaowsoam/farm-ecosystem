// chemicalQuality.service.ts
import { Repository } from 'typeorm';
import { ChemicalQuality } from '../models/chemicalQuality.model';

export class ChemicalQualityService {
  constructor(private repo: Repository<ChemicalQuality>) {}

  async create(data: Partial<ChemicalQuality>) {
    const entity = this.repo.create(data);
    return await this.repo.save(entity);
  }

  async findAll() {
    return await this.repo.find();
  }

  async findById(id: number) {
    return await this.repo.findOneBy({ id });
  }

  async update(id: number, data: Partial<ChemicalQuality>) {
    await this.repo.update(id, data);
    return await this.findById(id);
  }

  async delete(id: number) {
    return await this.repo.delete(id);
  }
}
