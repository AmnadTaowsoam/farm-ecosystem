"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WaterQualityService = void 0;
// src/services/waterQuality.service.ts
const dataSource_1 = require("../utils/dataSource");
const waterQuality_model_1 = require("../models/waterQuality.model");
class WaterQualityService {
    constructor() {
        this.repo = dataSource_1.AppDataSource.getRepository(waterQuality_model_1.WaterQuality);
    }
    async findAll() {
        return this.repo.find();
    }
    async findOne(id) {
        return this.repo.findOne({ where: { id } });
    }
    async create(data) {
        const wq = this.repo.create(data);
        return this.repo.save(wq);
    }
    async update(id, data) {
        await this.repo.update(id, data);
        return this.findOne(id);
    }
    async delete(id) {
        await this.repo.delete(id);
    }
}
exports.WaterQualityService = WaterQualityService;
