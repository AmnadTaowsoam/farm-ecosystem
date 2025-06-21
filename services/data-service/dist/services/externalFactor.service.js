"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExternalFactorService = void 0;
// src/services/externalFactor.service.ts
const dataSource_1 = require("../utils/dataSource");
const externalFactor_model_1 = require("../models/externalFactor.model");
class ExternalFactorService {
    constructor() {
        this.repo = dataSource_1.AppDataSource.getRepository(externalFactor_model_1.ExternalFactor);
    }
    async findAll() {
        return this.repo.find();
    }
    async findOne(id) {
        return this.repo.findOne({ where: { id } });
    }
    async create(data) {
        const ext = this.repo.create(data);
        return this.repo.save(ext);
    }
    async update(id, data) {
        await this.repo.update(id, data);
        return this.findOne(id);
    }
    async delete(id) {
        await this.repo.delete(id);
    }
}
exports.ExternalFactorService = ExternalFactorService;
