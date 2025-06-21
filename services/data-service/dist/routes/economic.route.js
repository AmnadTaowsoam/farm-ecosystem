"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/economicData.route.ts
const express_1 = require("express");
const economic_service_1 = require("../services/economic.service");
const econRouter = (0, express_1.Router)();
const econService = new economic_service_1.EconomicDataService();
/** GET /api/economic-data */
econRouter.get('/economic-data', async (req, res, next) => {
    try {
        const list = await econService.findAll();
        res.json(list);
    }
    catch (err) {
        next(err);
    }
});
/** GET /api/economic-data/:id */
econRouter.get('/economic-data/:id', async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const item = await econService.findOne(id);
        if (!item)
            return res.status(404).json({ message: 'EconomicData not found' });
        res.json(item);
    }
    catch (err) {
        next(err);
    }
});
/** POST /api/economic-data */
econRouter.post('/economic-data', async (req, res, next) => {
    try {
        const data = req.body;
        const newItem = await econService.create(data);
        res.status(201).json(newItem);
    }
    catch (err) {
        next(err);
    }
});
/** PUT /api/economic-data/:id */
econRouter.put('/economic-data/:id', async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const data = req.body;
        const updated = await econService.update(id, data);
        if (!updated)
            return res.status(404).json({ message: 'EconomicData not found' });
        res.json(updated);
    }
    catch (err) {
        next(err);
    }
});
/** DELETE /api/economic-data/:id */
econRouter.delete('/economic-data/:id', async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        await econService.delete(id);
        res.status(204).send();
    }
    catch (err) {
        next(err);
    }
});
exports.default = econRouter;
