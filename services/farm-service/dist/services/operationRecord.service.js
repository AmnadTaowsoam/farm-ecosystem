"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OperationRecordService = void 0;
// src/services/operationRecord.service.ts
const dataSource_1 = require("../utils/dataSource");
const operationRecord_model_1 = require("../models/operationRecord.model");
class OperationRecordService {
    constructor() {
        this.repo = dataSource_1.AppDataSource.getRepository(operationRecord_model_1.OperationRecord);
    }
    async findAll() {
        return this.repo.find();
    }
    async findOne(id) {
        return this.repo.findOne({ where: { id } });
    }
    async create(data) {
        const record = this.repo.create(data);
        return this.repo.save(record);
    }
    async update(id, data) {
        await this.repo.update(id, data);
        return this.findOne(id);
    }
    async delete(id) {
        await this.repo.delete(id);
    }
}
exports.OperationRecordService = OperationRecordService;
