"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PerformanceMetricService = void 0;
// src/services/performanceMetric.service.ts
const dataSource_1 = require("../utils/dataSource");
const performanceMetric_model_1 = require("../models/performanceMetric.model");
class PerformanceMetricService {
    constructor() {
        this.repo = dataSource_1.AppDataSource.getRepository(performanceMetric_model_1.PerformanceMetric);
    }
    async findAll() {
        return this.repo.find();
    }
    async findOne(id, recorded_date) {
        return this.repo.findOne({ where: { id, recorded_date } });
    }
    async create(data) {
        const pm = this.repo.create(data);
        return this.repo.save(pm);
    }
    async update(id, recorded_date, data) {
        await this.repo.update({ id, recorded_date }, data);
        return this.findOne(id, recorded_date);
    }
    async delete(id, recorded_date) {
        await this.repo.delete({ id, recorded_date });
    }
}
exports.PerformanceMetricService = PerformanceMetricService;
