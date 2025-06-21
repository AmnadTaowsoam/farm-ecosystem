"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/healthRecord.route.ts
const express_1 = require("express");
const healthRecord_service_1 = require("../services/healthRecord.service");
const hrRouter = (0, express_1.Router)();
const hrService = new healthRecord_service_1.HealthRecordService();
/** GET /api/health-records */
hrRouter.get('/health-records', async (req, res, next) => {
    try {
        const list = await hrService.findAll();
        res.json(list);
    }
    catch (err) {
        next(err);
    }
});
/** GET /api/health-records/:id */
hrRouter.get('/health-records/:id', async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const item = await hrService.findOne(id);
        if (!item)
            return res.status(404).json({ message: 'HealthRecord not found' });
        res.json(item);
    }
    catch (err) {
        next(err);
    }
});
/** POST /api/health-records */
hrRouter.post('/health-records', async (req, res, next) => {
    try {
        const data = req.body;
        const newItem = await hrService.create(data);
        res.status(201).json(newItem);
    }
    catch (err) {
        next(err);
    }
});
/** PUT /api/health-records/:id */
hrRouter.put('/health-records/:id', async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const data = req.body;
        const updated = await hrService.update(id, data);
        if (!updated)
            return res.status(404).json({ message: 'HealthRecord not found' });
        res.json(updated);
    }
    catch (err) {
        next(err);
    }
});
/** DELETE /api/health-records/:id */
hrRouter.delete('/health-records/:id', async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        await hrService.delete(id);
        res.status(204).send();
    }
    catch (err) {
        next(err);
    }
});
exports.default = hrRouter;
