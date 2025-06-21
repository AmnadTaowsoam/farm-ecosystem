"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeviceGroupService = void 0;
const dataSource_1 = require("../utils/dataSource");
const deviceGroup_model_1 = require("../models/deviceGroup.model");
class DeviceGroupService {
    constructor() {
        this.repo = dataSource_1.AppDataSource.getRepository(deviceGroup_model_1.DeviceGroup);
    }
    async findAll() {
        return this.repo.find({ relations: ['devices'] });
    }
    async findOne(id) {
        return this.repo.findOne({
            where: { group_id: id },
            relations: ['devices']
        });
    }
    async create(data) {
        const group = this.repo.create(data);
        return this.repo.save(group);
    }
    async update(id, data) {
        await this.repo.update(id, data);
        return this.findOne(id);
    }
    async delete(id) {
        await this.repo.delete(id);
    }
}
exports.DeviceGroupService = DeviceGroupService;
