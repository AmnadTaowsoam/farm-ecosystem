"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeneticFactorService = void 0;
// src/services/geneticFactor.service.ts
const dataSource_1 = require("../utils/dataSource");
const geneticFactor_model_1 = require("../models/geneticFactor.model");
class GeneticFactorService {
    constructor() {
        this.repo = dataSource_1.AppDataSource.getRepository(geneticFactor_model_1.GeneticFactor);
    }
    async findAll() {
        return this.repo.find();
    }
    async findOne(id) {
        return this.repo.findOne({ where: { id } });
    }
    async create(data) {
        const gf = this.repo.create(data);
        return this.repo.save(gf);
    }
    async update(id, data) {
        await this.repo.update(id, data);
        return this.findOne(id);
    }
    async delete(id) {
        await this.repo.delete(id);
    }
}
exports.GeneticFactorService = GeneticFactorService;
