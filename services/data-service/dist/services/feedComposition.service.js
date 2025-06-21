"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedCompositionService = void 0;
// src/services/feedComposition.service.ts
const dataSource_1 = require("../utils/dataSource");
const feedComposition_model_1 = require("../models/feedComposition.model");
class FeedCompositionService {
    constructor() {
        this.repo = dataSource_1.AppDataSource.getRepository(feedComposition_model_1.FeedComposition);
    }
    async findAll() {
        return this.repo.find();
    }
    async findOne(id) {
        return this.repo.findOne({ where: { id } });
    }
    async create(data) {
        const comp = this.repo.create(data);
        return this.repo.save(comp);
    }
    async update(id, data) {
        await this.repo.update(id, data);
        return this.findOne(id);
    }
    async delete(id) {
        await this.repo.delete(id);
    }
}
exports.FeedCompositionService = FeedCompositionService;
