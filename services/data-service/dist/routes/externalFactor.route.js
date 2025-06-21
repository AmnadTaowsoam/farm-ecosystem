"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/externalFactor.route.ts
const express_1 = require("express");
const externalFactor_service_1 = require("../services/externalFactor.service");
const extRouter = (0, express_1.Router)();
const extService = new externalFactor_service_1.ExternalFactorService();
/** GET /api/external-factors */
extRouter.get('/external-factors', async (req, res, next) => {
    try {
        const list = await extService.findAll();
        res.json(list);
    }
    catch (err) {
        next(err);
    }
});
/** GET /api/external-factors/:id */
extRouter.get('/external-factors/:id', async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const item = await extService.findOne(id);
        if (!item)
            return res.status(404).json({ message: 'ExternalFactor not found' });
        res.json(item);
    }
    catch (err) {
        next(err);
    }
});
/** POST /api/external-factors */
extRouter.post('/external-factors', async (req, res, next) => {
    try {
        const data = req.body;
        const newItem = await extService.create(data);
        res.status(201).json(newItem);
    }
    catch (err) {
        next(err);
    }
});
/** PUT /api/external-factors/:id */
extRouter.put('/external-factors/:id', async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const data = req.body;
        const updated = await extService.update(id, data);
        if (!updated)
            return res.status(404).json({ message: 'ExternalFactor not found' });
        res.json(updated);
    }
    catch (err) {
        next(err);
    }
});
/** DELETE /api/external-factors/:id */
extRouter.delete('/external-factors/:id', async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        await extService.delete(id);
        res.status(204).send();
    }
    catch (err) {
        next(err);
    }
});
exports.default = extRouter;
