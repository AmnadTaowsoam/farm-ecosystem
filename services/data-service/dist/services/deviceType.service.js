"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeviceTypeService = void 0;
// src/services/deviceType.service.ts
const dataSource_1 = require("../utils/dataSource");
const deviceTypes_model_1 = require("../models/deviceTypes.model");
class DeviceTypeService {
    constructor() {
        this.repo = dataSource_1.AppDataSource.getRepository(deviceTypes_model_1.DeviceType);
    }
    findAll() {
        return this.repo.find({ relations: ['devices'] });
    }
    findOne(id) {
        return this.repo.findOne({ where: { type_id: id }, relations: ['devices'] });
    }
    create(data) {
        const dt = this.repo.create(data);
        return this.repo.save(dt);
    }
    async update(id, data) {
        await this.repo.update(id, data);
        return this.findOne(id);
    }
    delete(id) {
        return this.repo.delete(id).then(() => { });
    }
}
exports.DeviceTypeService = DeviceTypeService;
