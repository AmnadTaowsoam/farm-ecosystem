"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeviceLogService = void 0;
const dataSource_1 = require("../utils/dataSource");
const deviceLogs_model_1 = require("../models/deviceLogs.model");
class DeviceLogService {
    constructor() {
        this.repo = dataSource_1.AppDataSource.getRepository(deviceLogs_model_1.DeviceLog);
    }
    /**
     * Fetch all device logs, optionally filtered by device_id.
     */
    findAll(deviceId) {
        const options = deviceId
            ? { where: { device_id: deviceId }, order: { created_at: 'DESC' } }
            : { order: { created_at: 'DESC' } };
        return this.repo.find(options);
    }
    /**
     * Fetch a single log by its ID.
     * @param id Log ID
     */
    findOne(id) {
        return this.repo.findOne({ where: { log_id: id } });
    }
    /**
     * Create a new device log entry.
     * @param data Partial<DeviceLog> payload
     */
    create(data) {
        const log = this.repo.create(data);
        return this.repo.save(log);
    }
    /**
     * Update an existing log entry by ID.
     * @param id Log ID
     * @param data Partial<DeviceLog> fields to update
     */
    async update(id, data) {
        await this.repo.update(id, data);
        return this.findOne(id);
    }
    /**
     * Delete a log entry by ID.
     * @param id Log ID
     */
    delete(id) {
        return this.repo.delete(id).then(() => { });
    }
}
exports.DeviceLogService = DeviceLogService;
