// services/formula-service/src/services/formulaAdditional.service.ts
import { Repository } from 'typeorm';
import { AppDataSource } from '../utils/dataSource';
import { FormulaAdditional } from '../models/formulaAdditional.model';

export class FormulaAdditionalService {
  private repo: Repository<FormulaAdditional>;

  constructor() {
    this.repo = AppDataSource.getRepository(FormulaAdditional);
  }

  async create(data: Partial<FormulaAdditional>): Promise<FormulaAdditional> {
    const entity = this.repo.create(data);
    return this.repo.save(entity);
  }

  async findAll(): Promise<FormulaAdditional[]> {
    return this.repo.find({ relations: ['formula'] });
  }

  async findOneById(id: number): Promise<FormulaAdditional | null> {
    return this.repo.findOne({
      where: { id },
      relations: ['formula'],
    });
  }

  async update(id: number, data: Partial<FormulaAdditional>): Promise<FormulaAdditional | null> {
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
