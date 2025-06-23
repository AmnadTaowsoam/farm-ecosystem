"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/housingCondition.route.ts
const express_1 = require("express");
const housingCondition_service_1 = require("../services/housingCondition.service");
const hcRouter = (0, express_1.Router)();
const hcService = new housingCondition_service_1.HousingConditionService();
/** GET /api/housing-conditions */
hcRouter.get('/', async (req, res, next) => {
    try {
        const list = await hcService.findAll();
        res.json(list);
    }
    catch (err) {
        next(err);
    }
});
/** GET /api/housing-conditions/:id */
hcRouter.get('/:id', async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const item = await hcService.findOne(id);
        if (!item)
            return res.status(404).json({ message: 'HousingCondition not found' });
        res.json(item);
    }
    catch (err) {
        next(err);
    }
});
/** POST /api/housing-conditions */
hcRouter.post('/', async (req, res, next) => {
    try {
        const data = req.body;
        const newItem = await hcService.create(data);
        res.status(201).json(newItem);
    }
    catch (err) {
        next(err);
    }
});
/** PUT /api/housing-conditions/:id */
hcRouter.put('/:id', async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const data = req.body;
        const updated = await hcService.update(id, data);
        if (!updated)
            return res.status(404).json({ message: 'HousingCondition not found' });
        res.json(updated);
    }
    catch (err) {
        next(err);
    }
});
/** DELETE /api/housing-conditions/:id */
hcRouter.delete('/:id', async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        await hcService.delete(id);
        res.status(204).send();
    }
    catch (err) {
        next(err);
    }
});
exports.default = hcRouter;
