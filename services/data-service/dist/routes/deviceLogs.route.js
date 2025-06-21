"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/deviceLog.route.ts
const express_1 = require("express");
const deviceLogs_service_1 = require("../services/deviceLogs.service");
const router = (0, express_1.Router)();
const service = new deviceLogs_service_1.DeviceLogService();
/**
 * GET /api/device-logs
 * Optionally filter by ?device_id=#
 */
router.get('/device-logs', async (req, res, next) => {
    try {
        const deviceIdParam = req.query.device_id;
        const deviceId = deviceIdParam ? Number(deviceIdParam) : undefined;
        const logs = await service.findAll(deviceId);
        res.json(logs);
    }
    catch (err) {
        next(err);
    }
});
/**
 * GET /api/device-logs/:id
 */
router.get('/device-logs/:id', async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const log = await service.findOne(id);
        if (!log)
            return res.status(404).json({ message: 'DeviceLog not found' });
        res.json(log);
    }
    catch (err) {
        next(err);
    }
});
/**
 * POST /api/device-logs
 */
router.post('/device-logs', async (req, res, next) => {
    try {
        const data = req.body;
        const newLog = await service.create(data);
        res.status(201).json(newLog);
    }
    catch (err) {
        next(err);
    }
});
/**
 * PUT /api/device-logs/:id
 */
router.put('/device-logs/:id', async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const updated = await service.update(id, req.body);
        if (!updated)
            return res.status(404).json({ message: 'DeviceLog not found' });
        res.json(updated);
    }
    catch (err) {
        next(err);
    }
});
/**
 * DELETE /api/device-logs/:id
 */
router.delete('/device-logs/:id', async (req, res, next) => {
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
