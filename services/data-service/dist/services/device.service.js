"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeviceService = void 0;
const dataSource_1 = require("../utils/dataSource");
const device_model_1 = require("../models/device.model");
class DeviceService {
    constructor() {
        this.repo = dataSource_1.AppDataSource.getRepository(device_model_1.Device);
    }
    /**
     * Fetch all devices, including related type, group, status history,
     * feed assignments, and recent sensor data.
     */
    async findAll() {
        return this.repo.find({
            relations: [
                'house',
                'type',
                'group',
                'status_history',
                'feed_assignments',
                'sensor_data'
            ]
        });
    }
    /**
     * Fetch a single device by its ID, with all relations.
     * @param id Device ID
     */
    async findOne(id) {
        return this.repo.findOne({
            where: { device_id: id },
            relations: [
                'house',
                'type',
                'group',
                'status_history',
                'feed_assignments',
                'sensor_data'
            ]
        });
    }
    /**
     * Create a new device record.
     * @param data Partial<Device> payload
     */
    async create(data) {
        const device = this.repo.create(data);
        return this.repo.save(device);
    }
    /**
     * Update an existing device by ID.
     * @param id Device ID
     * @param data Partial<Device> fields to update
     */
    async update(id, data) {
        await this.repo.update(id, data);
        return this.findOne(id);
    }
    /**
     * Delete a device by ID.
     * @param id Device ID
     */
    async delete(id) {
        await this.repo.delete(id);
    }
}
exports.DeviceService = DeviceService;
