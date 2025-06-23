"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HousingConditionService = void 0;
// src/services/housingCondition.service.ts
const dataSource_1 = require("../utils/dataSource");
const housingCondition_model_1 = require("../models/housingCondition.model");
class HousingConditionService {
    constructor() {
        this.repo = dataSource_1.AppDataSource.getRepository(housingCondition_model_1.HousingCondition);
    }
    async findAll() {
        return this.repo.find();
    }
    async findOne(id) {
        return this.repo.findOne({ where: { id } });
    }
    async create(data) {
        const hc = this.repo.create(data);
        return this.repo.save(hc);
    }
    async update(id, data) {
        await this.repo.update(id, data);
        return this.findOne(id);
    }
    async delete(id) {
        await this.repo.delete(id);
    }
}
exports.HousingConditionService = HousingConditionService;
