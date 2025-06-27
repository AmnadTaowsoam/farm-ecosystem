"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormulaCompositionService = void 0;
const dataSource_1 = require("../utils/dataSource");
const formulaComposition_model_1 = require("../models/formulaComposition.model");
class FormulaCompositionService {
    constructor() {
        this.repo = dataSource_1.AppDataSource.getRepository(formulaComposition_model_1.FormulaComposition);
    }
    async create(data) {
        const entity = this.repo.create(data);
        return this.repo.save(entity);
    }
    async findAll() {
        return this.repo.find({ relations: ['formula'] });
    }
    async findOneById(id) {
        return this.repo.findOne({
            where: { id },
            relations: ['formula'],
        });
    }
    async update(id, data) {
        const entity = await this.repo.findOneBy({ id });
        if (!entity)
            return null;
        this.repo.merge(entity, data);
        return this.repo.save(entity);
    }
    async delete(id) {
        const result = await this.repo.delete(id);
        return result.affected !== 0;
    }
}
exports.FormulaCompositionService = FormulaCompositionService;
