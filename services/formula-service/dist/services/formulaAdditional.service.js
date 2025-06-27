"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormulaAdditionalService = void 0;
const dataSource_1 = require("../utils/dataSource");
const formulaAdditional_model_1 = require("../models/formulaAdditional.model");
class FormulaAdditionalService {
    constructor() {
        this.repo = dataSource_1.AppDataSource.getRepository(formulaAdditional_model_1.FormulaAdditional);
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
exports.FormulaAdditionalService = FormulaAdditionalService;
