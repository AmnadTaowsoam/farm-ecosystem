"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedBatchService = void 0;
// src/services/feedBatch.service.ts
const dataSource_1 = require("../utils/dataSource");
const feedBatch_model_1 = require("../models/feedBatch.model");
class FeedBatchService {
    constructor() {
        this.repo = dataSource_1.AppDataSource.getRepository(feedBatch_model_1.FeedBatch);
    }
    async findAll() {
        return this.repo.find();
    }
    async findOne(id) {
        return this.repo.findOne({ where: { feed_batch_id: id } });
    }
    async create(data) {
        const batch = this.repo.create(data);
        return this.repo.save(batch);
    }
    async update(id, data) {
        await this.repo.update(id, data);
        return this.findOne(id);
    }
    async delete(id) {
        await this.repo.delete(id);
    }
}
exports.FeedBatchService = FeedBatchService;
