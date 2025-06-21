"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/device.route.ts
const express_1 = require("express");
const device_service_1 = require("../services/device.service");
const router = (0, express_1.Router)();
const service = new device_service_1.DeviceService();
/**
 * GET /api/devices
 * Fetch all devices (with relations)
 */
router.get('/devices', async (req, res, next) => {
    try {
        const devices = await service.findAll();
        res.json(devices);
    }
    catch (err) {
        next(err);
    }
});
/**
 * GET /api/devices/:id
 * Fetch single device by ID
 */
router.get('/devices/:id', async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const device = await service.findOne(id);
        if (!device) {
            return res.status(404).json({ message: 'Device not found' });
        }
        res.json(device);
    }
    catch (err) {
        next(err);
    }
});
/**
 * POST /api/devices
 * Create a new device
 */
router.post('/devices', async (req, res, next) => {
    try {
        const data = req.body;
        const newDevice = await service.create(data);
        res.status(201).json(newDevice);
    }
    catch (err) {
        next(err);
    }
});
/**
 * PUT /api/devices/:id
 * Update an existing device
 */
router.put('/devices/:id', async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const data = req.body;
        const updated = await service.update(id, data);
        if (!updated) {
            return res.status(404).json({ message: 'Device not found' });
        }
        res.json(updated);
    }
    catch (err) {
        next(err);
    }
});
/**
 * DELETE /api/devices/:id
 * Delete a device
 */
router.delete('/devices/:id', async (req, res, next) => {
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
