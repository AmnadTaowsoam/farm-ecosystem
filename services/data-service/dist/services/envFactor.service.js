"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnvFactorService = void 0;
// src/services/envFactor.service.ts
const dataSource_1 = require("../utils/dataSource");
const envFactor_model_1 = require("../models/envFactor.model");
class EnvFactorService {
    constructor() {
        this.repo = dataSource_1.AppDataSource.getRepository(envFactor_model_1.EnvironmentalFactor);
    }
    async findAll() {
        return this.repo.find();
    }
    async findOne(id) {
        return this.repo.findOne({ where: { id } });
    }
    async create(data) {
        const env = this.repo.create(data);
        return this.repo.save(env);
    }
    async update(id, data) {
        await this.repo.update(id, data);
        return this.findOne(id);
    }
    async delete(id) {
        await this.repo.delete(id);
    }
}
exports.EnvFactorService = EnvFactorService;
