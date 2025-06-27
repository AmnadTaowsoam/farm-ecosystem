// services/formula-service/src/services/formulaComposition.service.ts
import { Repository } from 'typeorm';
import { AppDataSource } from '../utils/dataSource';
import { FormulaComposition } from '../models/formulaComposition.model';

export class FormulaCompositionService {
  private repo: Repository<FormulaComposition>;

  constructor() {
    this.repo = AppDataSource.getRepository(FormulaComposition);
  }

  async create(data: Partial<FormulaComposition>): Promise<FormulaComposition> {
    const entity = this.repo.create(data);
    return this.repo.save(entity);
  }

  async findAll(): Promise<FormulaComposition[]> {
    return this.repo.find({ relations: ['formula'] });
  }

  async findOneById(id: number): Promise<FormulaComposition | null> {
    return this.repo.findOne({
      where: { id },
      relations: ['formula'],
    });
  }

  async update(id: number, data: Partial<FormulaComposition>): Promise<FormulaComposition | null> {
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
