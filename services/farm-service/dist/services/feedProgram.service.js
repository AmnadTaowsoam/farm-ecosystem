"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedProgramService = void 0;
// src/services/feedProgram.service.ts
const dataSource_1 = require("../utils/dataSource");
const feedProgram_model_1 = require("../models/feedProgram.model");
class FeedProgramService {
    constructor() {
        this.repo = dataSource_1.AppDataSource.getRepository(feedProgram_model_1.FeedProgram);
    }
    async findAll() {
        return this.repo.find();
    }
    async findOne(id) {
        return this.repo.findOne({ where: { id } });
    }
    async create(data) {
        const program = this.repo.create(data);
        return this.repo.save(program);
    }
    async update(id, data) {
        await this.repo.update(id, data);
        return this.findOne(id);
    }
    async delete(id) {
        await this.repo.delete(id);
    }
}
exports.FeedProgramService = FeedProgramService;
