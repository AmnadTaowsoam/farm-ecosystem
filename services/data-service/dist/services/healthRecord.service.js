"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HealthRecordService = void 0;
// src/services/healthRecord.service.ts
const dataSource_1 = require("../utils/dataSource");
const healthRecord_model_1 = require("../models/healthRecord.model");
class HealthRecordService {
    constructor() {
        this.repo = dataSource_1.AppDataSource.getRepository(healthRecord_model_1.HealthRecord);
    }
    async findAll() {
        return this.repo.find();
    }
    async findOne(id) {
        return this.repo.findOne({ where: { id } });
    }
    async create(data) {
        const hr = this.repo.create(data);
        return this.repo.save(hr);
    }
    async update(id, data) {
        await this.repo.update(id, data);
        return this.findOne(id);
    }
    async delete(id) {
        await this.repo.delete(id);
    }
}
exports.HealthRecordService = HealthRecordService;
