// services/formula-service/src/services/formulaEnergy.service.ts
import { Repository } from 'typeorm';
import { AppDataSource } from '../utils/dataSource';
import { FormulaEnergy } from '../models/formulaEnergy.model';

export class FormulaEnergyService {
  private repo: Repository<FormulaEnergy>;

  constructor() {
    this.repo = AppDataSource.getRepository(FormulaEnergy);
  }

  async create(data: Partial<FormulaEnergy>): Promise<FormulaEnergy> {
    const entity = this.repo.create(data);
    return this.repo.save(entity);
  }

  async findAll(): Promise<FormulaEnergy[]> {
    return this.repo.find({ relations: ['formula'] });
  }

  async findOneById(id: number): Promise<FormulaEnergy | null> {
    return this.repo.findOne({
      where: { id },
      relations: ['formula'],
    });
  }

  async update(id: number, data: Partial<FormulaEnergy>): Promise<FormulaEnergy | null> {
    const entity = await this.repo.findOneBy({ id });
    if (!entity) return null;

    this.repo.merge(entity, data);
    return this.repo.save(entity);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.repo.delete(id);
    return result.affected !== 0;
  }
}
