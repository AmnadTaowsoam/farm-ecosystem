"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedBatchAssignService = void 0;
// src/services/feedBatchAssign.service.ts
const dataSource_1 = require("../utils/dataSource");
const feedBatchAssign_model_1 = require("../models/feedBatchAssign.model");
class FeedBatchAssignService {
    constructor() {
        this.repo = dataSource_1.AppDataSource.getRepository(feedBatchAssign_model_1.FeedBatchAssignment);
    }
    async findAll() {
        return this.repo.find();
    }
    async findOne(id) {
        return this.repo.findOne({ where: { assignment_id: id } });
    }
    async create(data) {
        const assign = this.repo.create(data);
        return this.repo.save(assign);
    }
    async update(id, data) {
        await this.repo.update(id, data);
        return this.findOne(id);
    }
    async delete(id) {
        await this.repo.delete(id);
    }
}
exports.FeedBatchAssignService = FeedBatchAssignService;
