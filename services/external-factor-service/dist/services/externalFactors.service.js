"use strict";
// services/external-factor-service/src/services/externalFactors.service.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExternalFactorsService = void 0;
const dataSource_1 = require("../utils/dataSource");
const externalFactors_model_1 = require("../models/externalFactors.model");
class ExternalFactorsService {
    constructor() {
        this.repo = dataSource_1.AppDataSource.getRepository(externalFactors_model_1.ExternalFactors);
    }
    async create(data) {
        return this.repo.save(data);
    }
    async findAll() {
        return this.repo.find();
    }
    async findById(id) {
        return this.repo.findOneBy({ id });
    }
    async update(id, data) {
        await this.repo.update(id, data);
        const updated = await this.findById(id);
        if (!updated)
            throw new Error('ExternalFactors not found');
        return updated;
    }
    async delete(id) {
        await this.repo.delete(id);
    }
}
exports.ExternalFactorsService = ExternalFactorsService;
exports.default = new ExternalFactorsService();
