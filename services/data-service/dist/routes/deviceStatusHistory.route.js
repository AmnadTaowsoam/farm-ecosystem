"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/deviceStatusHistory.route.ts
const express_1 = require("express");
const deviceStatusHistory_service_1 = require("../services/deviceStatusHistory.service");
const router = (0, express_1.Router)();
const service = new deviceStatusHistory_service_1.DeviceStatusHistoryService();
/**
 * GET /api/device-status-history
 * Fetch all status history entries, optionally filtered by device_id query param.
 */
router.get('/device-status-history', async (req, res, next) => {
    try {
        const deviceIdParam = req.query.device_id;
        const deviceId = deviceIdParam ? Number(deviceIdParam) : undefined;
        const list = deviceId
            ? await service.findAll({ device_id: deviceId })
            : await service.findAll();
        res.json(list);
    }
    catch (err) {
        next(err);
    }
});
/**
 * GET /api/device-status-history/:id
 * Fetch a single status history record by ID.
 */
router.get('/device-status-history/:id', async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const record = await service.findOne(id);
        if (!record)
            return res.status(404).json({ message: 'Status history not found' });
        res.json(record);
    }
    catch (err) {
        next(err);
    }
});
/**
 * POST /api/device-status-history
 * Create a new status history record.
 */
router.post('/device-status-history', async (req, res, next) => {
    try {
        const data = req.body;
        const newRecord = await service.create(data);
        res.status(201).json(newRecord);
    }
    catch (err) {
        next(err);
    }
});
/**
 * PUT /api/device-status-history/:id
 * Update an existing status history record.
 */
router.put('/device-status-history/:id', async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const updated = await service.update(id, req.body);
        if (!updated)
            return res.status(404).json({ message: 'Status history not found' });
        res.json(updated);
    }
    catch (err) {
        next(err);
    }
});
/**
 * DELETE /api/device-status-history/:id
 * Delete a status history record.
 */
router.delete('/device-status-history/:id', async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        await service.delete(id);
        res.sendStatus(204);
    }
    catch (err) {
        next(err);
    }
});
exports.default = router;
