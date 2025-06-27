// services/formula-service/src/services/formula.service.ts
import { Repository } from 'typeorm';
import { AppDataSource } from '../utils/dataSource';
import { Formula } from '../models/formula.model';

export class FormulaService {
  private formulaRepository: Repository<Formula>;

  constructor() {
    this.formulaRepository = AppDataSource.getRepository(Formula);
  }

  async create(data: Partial<Formula>): Promise<Formula> {
    const formula = this.formulaRepository.create(data);
    return this.formulaRepository.save(formula);
  }

  async findAll(): Promise<Formula[]> {
    return this.formulaRepository.find({
      relations: ['compositions', 'energies', 'nutritions', 'additionals'],
    });
  }

  async findOneById(id: number): Promise<Formula | null> {
    return this.formulaRepository.findOne({
      where: { formulaId: id },
      relations: ['compositions', 'energies', 'nutritions', 'additionals'],
    });
  }

  async update(id: number, data: Partial<Formula>): Promise<Formula | null> {
    const formula = await this.formulaRepository.findOneBy({ formulaId: id });
    if (!formula) return null;

    this.formulaRepository.merge(formula, data);
    return this.formulaRepository.save(formula);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.formulaRepository.delete(id);
    return result.affected !== 0;
  }
}
