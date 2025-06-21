"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EconomicDataService = void 0;
// src/services/economicData.service.ts
const dataSource_1 = require("../utils/dataSource");
const economic_model_1 = require("../models/economic.model");
class EconomicDataService {
    constructor() {
        this.repo = dataSource_1.AppDataSource.getRepository(economic_model_1.EconomicData);
    }
    async findAll() {
        return this.repo.find();
    }
    async findOne(id) {
        return this.repo.findOne({ where: { id } });
    }
    async create(data) {
        const econ = this.repo.create(data);
        return this.repo.save(econ);
    }
    async update(id, data) {
        await this.repo.update(id, data);
        return this.findOne(id);
    }
    async delete(id) {
        await this.repo.delete(id);
    }
}
exports.EconomicDataService = EconomicDataService;
