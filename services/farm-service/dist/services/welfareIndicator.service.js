"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WelfareIndicatorService = void 0;
// src/services/welfareIndicator.service.ts
const dataSource_1 = require("../utils/dataSource");
const welfareIndicator_model_1 = require("../models/welfareIndicator.model");
class WelfareIndicatorService {
    constructor() {
        this.repo = dataSource_1.AppDataSource.getRepository(welfareIndicator_model_1.WelfareIndicator);
    }
    async findAll() {
        return this.repo.find();
    }
    async findOne(id) {
        return this.repo.findOne({ where: { id } });
    }
    async create(data) {
        const wi = this.repo.create(data);
        return this.repo.save(wi);
    }
    async update(id, data) {
        await this.repo.update(id, data);
        return this.findOne(id);
    }
    async delete(id) {
        await this.repo.delete(id);
    }
}
exports.WelfareIndicatorService = WelfareIndicatorService;
