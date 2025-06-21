"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FarmService = void 0;
// src/services/farm.service.ts
const dataSource_1 = require("../utils/dataSource");
const farm_model_1 = require("../models/farm.model");
class FarmService {
    constructor() {
        this.repo = dataSource_1.AppDataSource.getRepository(farm_model_1.Farm);
    }
    async findAll() {
        return this.repo.find();
    }
    async findOne(id) {
        return this.repo.findOne({ where: { farm_id: id } });
    }
    async create(data) {
        const farm = this.repo.create(data);
        return this.repo.save(farm);
    }
    async update(id, data) {
        await this.repo.update(id, data);
        return this.findOne(id);
    }
    async delete(id) {
        await this.repo.delete(id);
    }
}
exports.FarmService = FarmService;
