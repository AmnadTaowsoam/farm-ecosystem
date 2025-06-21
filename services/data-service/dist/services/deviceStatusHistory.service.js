"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeviceStatusHistoryService = void 0;
const dataSource_1 = require("../utils/dataSource");
const deviceStatusHistory_model_1 = require("../models/deviceStatusHistory.model");
class DeviceStatusHistoryService {
    constructor() {
        this.repo = dataSource_1.AppDataSource.getRepository(deviceStatusHistory_model_1.DeviceStatusHistory);
    }
    /**
     * Fetch all status history entries.
     * @param filter Optional filter object, e.g. { device_id: 123 }
     */
    findAll(filter) {
        const where = {};
        if (filter?.device_id !== undefined) {
            where.device_id = filter.device_id;
        }
        return this.repo.find({
            where,
            order: { changed_at: 'DESC' },
        });
    }
    /**
     * Fetch a single status history entry by its ID.
     * @param id The record ID
     */
    findOne(id) {
        return this.repo.findOne({ where: { id } });
    }
    /**
     * Create a new status history record.
     * @param data Partial payload
     */
    create(data) {
        const record = this.repo.create(data);
        return this.repo.save(record);
    }
    /**
     * Update an existing status history record.
     * @param id Record ID
     * @param data Partial fields to update
     */
    async update(id, data) {
        await this.repo.update(id, data);
        return this.findOne(id);
    }
    /**
     * Delete a status history record by its ID.
     * @param id Record ID
     */
    delete(id) {
        return this.repo.delete(id).then(() => { });
    }
}
exports.DeviceStatusHistoryService = DeviceStatusHistoryService;
