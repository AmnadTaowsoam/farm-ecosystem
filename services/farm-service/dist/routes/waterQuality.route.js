"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/waterQuality.route.ts
const express_1 = require("express");
const waterQuality_service_1 = require("../services/waterQuality.service");
const wqRouter = (0, express_1.Router)();
const wqService = new waterQuality_service_1.WaterQualityService();
/** GET /api/water-quality */
wqRouter.get('/', async (req, res, next) => {
    try {
        const list = await wqService.findAll();
        res.json(list);
    }
    catch (err) {
        next(err);
    }
});
/** GET /api/water-quality/:id */
wqRouter.get('/:id', async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const item = await wqService.findOne(id);
        if (!item)
            return res.status(404).json({ message: 'WaterQuality not found' });
        res.json(item);
    }
    catch (err) {
        next(err);
    }
});
/** POST /api/water-quality */
wqRouter.post('/', async (req, res, next) => {
    try {
        const data = req.body;
        const newItem = await wqService.create(data);
        res.status(201).json(newItem);
    }
    catch (err) {
        next(err);
    }
});
/** PUT /api/water-quality/:id */
wqRouter.put('/:id', async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const data = req.body;
        const updated = await wqService.update(id, data);
        if (!updated)
            return res.status(404).json({ message: 'WaterQuality not found' });
        res.json(updated);
    }
    catch (err) {
        next(err);
    }
});
/** DELETE /api/water-quality/:id */
wqRouter.delete('/:id', async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        await wqService.delete(id);
        res.status(204).send();
    }
    catch (err) {
        next(err);
    }
});
exports.default = wqRouter;
