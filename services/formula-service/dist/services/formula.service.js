"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormulaService = void 0;
const dataSource_1 = require("../utils/dataSource");
const formula_model_1 = require("../models/formula.model");
class FormulaService {
    constructor() {
        this.formulaRepository = dataSource_1.AppDataSource.getRepository(formula_model_1.Formula);
    }
    async create(data) {
        const formula = this.formulaRepository.create(data);
        return this.formulaRepository.save(formula);
    }
    async findAll() {
        return this.formulaRepository.find({
            relations: ['compositions', 'energies', 'nutritions', 'additionals'],
        });
    }
    async findOneById(id) {
        return this.formulaRepository.findOne({
            where: { formulaId: id },
            relations: ['compositions', 'energies', 'nutritions', 'additionals'],
        });
    }
    async update(id, data) {
        const formula = await this.formulaRepository.findOneBy({ formulaId: id });
        if (!formula)
            return null;
        this.formulaRepository.merge(formula, data);
        return this.formulaRepository.save(formula);
    }
    async delete(id) {
        const result = await this.formulaRepository.delete(id);
        return result.affected !== 0;
    }
}
exports.FormulaService = FormulaService;
