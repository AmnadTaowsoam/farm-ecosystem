"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedIntakeService = void 0;
// src/services/feedIntake.service.ts
const dataSource_1 = require("../utils/dataSource");
const feedIntake_model_1 = require("../models/feedIntake.model");
class FeedIntakeService {
    constructor() {
        this.repo = dataSource_1.AppDataSource.getRepository(feedIntake_model_1.FeedIntake);
    }
    async findAll() {
        return this.repo.find();
    }
    async findOne(id) {
        return this.repo.findOne({ where: { id } });
    }
    async create(data) {
        const intake = this.repo.create(data);
        return this.repo.save(intake);
    }
    async update(id, data) {
        await this.repo.update(id, data);
        return this.findOne(id);
    }
    async delete(id) {
        await this.repo.delete(id);
    }
}
exports.FeedIntakeService = FeedIntakeService;
