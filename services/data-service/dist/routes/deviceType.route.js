"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/deviceType.route.ts
const express_1 = require("express");
const deviceType_service_1 = require("../services/deviceType.service");
const router = (0, express_1.Router)();
const service = new deviceType_service_1.DeviceTypeService();
/** GET /api/device-types */
router.get('/device-types', async (req, res, next) => {
    try {
        const types = await service.findAll();
        res.json(types);
    }
    catch (err) {
        next(err);
    }
});
/** GET /api/device-types/:id */
router.get('/device-types/:id', async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const type = await service.findOne(id);
        if (!type)
            return res.status(404).json({ message: 'DeviceType not found' });
        res.json(type);
    }
    catch (err) {
        next(err);
    }
});
/** POST /api/device-types */
router.post('/device-types', async (req, res, next) => {
    try {
        const data = req.body;
        const newType = await service.create(data);
        res.status(201).json(newType);
    }
    catch (err) {
        next(err);
    }
});
/** PUT /api/device-types/:id */
router.put('/device-types/:id', async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const updated = await service.update(id, req.body);
        if (!updated)
            return res.status(404).json({ message: 'DeviceType not found' });
        res.json(updated);
    }
    catch (err) {
        next(err);
    }
});
/** DELETE /api/device-types/:id */
router.delete('/device-types/:id', async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        await service.delete(id);
        res.status(204).send();
    }
    catch (err) {
        next(err);
    }
});
exports.default = router;
