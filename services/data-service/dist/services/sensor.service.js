"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SensorService = void 0;
// src/services/sensor.service.ts
const dataSource_1 = require("../utils/dataSource");
const sensor_model_1 = require("../models/sensor.model");
class SensorService {
    constructor() {
        this.repo = dataSource_1.AppDataSource.getRepository(sensor_model_1.SensorData);
    }
    async findAll() {
        return this.repo.find();
    }
    async findOne(time, device_id, topic) {
        return this.repo.findOne({ where: { time, device_id, topic } });
    }
    async create(data) {
        const sensor = this.repo.create(data);
        return this.repo.save(sensor);
    }
    async update(time, device_id, topic, data) {
        await this.repo.update({ time, device_id, topic }, data);
        return this.findOne(time, device_id, topic);
    }
    async delete(time, device_id, topic) {
        await this.repo.delete({ time, device_id, topic });
    }
}
exports.SensorService = SensorService;
