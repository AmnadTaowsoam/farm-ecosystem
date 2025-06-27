// services/formula-service/src/services/formulaNutrition.service.ts
import { Repository } from 'typeorm';
import { AppDataSource } from '../utils/dataSource';
import { FormulaNutrition } from '../models/formulaNutrition.model';

export class FormulaNutritionService {
  private repo: Repository<FormulaNutrition>;

  constructor() {
    this.repo = AppDataSource.getRepository(FormulaNutrition);
  }

  async create(data: Partial<FormulaNutrition>): Promise<FormulaNutrition> {
    const entity = this.repo.create(data);
    return this.repo.save(entity);
  }

  async findAll(): Promise<FormulaNutrition[]> {
    return this.repo.find({ relations: ['formula'] });
  }

  async findOneById(id: number): Promise<FormulaNutrition | null> {
    return this.repo.findOne({
      where: { id },
      relations: ['formula'],
    });
  }

  async update(id: number, data: Partial<FormulaNutrition>): Promise<FormulaNutrition | null> {
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
