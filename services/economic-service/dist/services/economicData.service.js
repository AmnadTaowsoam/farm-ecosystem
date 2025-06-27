"use strict";
// services/economic-service/src/services/economicData.service.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.EconomicDataService = void 0;
const dataSource_1 = require("../utils/dataSource");
const economicData_model_1 = require("../models/economicData.model");
class EconomicDataService {
    constructor() {
        this.repo = dataSource_1.AppDataSource.getRepository(economicData_model_1.EconomicData);
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
            throw new Error('EconomicData not found');
        return updated;
    }
    async delete(id) {
        await this.repo.delete(id);
    }
}
exports.EconomicDataService = EconomicDataService;
exports.default = new EconomicDataService();
