"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/deviceGroup.route.ts
const express_1 = require("express");
const deviceGroup_service_1 = require("../services/deviceGroup.service");
const router = (0, express_1.Router)();
const service = new deviceGroup_service_1.DeviceGroupService();
/** GET /api/device-groups */
router.get('/device-groups', async (_req, res, next) => {
    try {
        const list = await service.findAll();
        res.json(list);
    }
    catch (err) {
        next(err);
    }
});
/** GET /api/device-groups/:id */
router.get('/device-groups/:id', async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const group = await service.findOne(id);
        if (!group)
            return res.status(404).json({ message: 'DeviceGroup not found' });
        res.json(group);
    }
    catch (err) {
        next(err);
    }
});
/** POST /api/device-groups */
router.post('/device-groups', async (req, res, next) => {
    try {
        const data = req.body;
        const newGroup = await service.create(data);
        res.status(201).json(newGroup);
    }
    catch (err) {
        next(err);
    }
});
/** PUT /api/device-groups/:id */
router.put('/device-groups/:id', async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const updated = await service.update(id, req.body);
        if (!updated)
            return res.status(404).json({ message: 'DeviceGroup not found' });
        res.json(updated);
    }
    catch (err) {
        next(err);
    }
});
/** DELETE /api/device-groups/:id */
router.delete('/device-groups/:id', async (req, res, next) => {
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
