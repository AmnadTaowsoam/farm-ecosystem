"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/welfareIndicator.route.ts
const express_1 = require("express");
const welfareIndicator_service_1 = require("../services/welfareIndicator.service");
const wiRouter = (0, express_1.Router)();
const wiService = new welfareIndicator_service_1.WelfareIndicatorService();
/** GET /api/welfare-indicators */
wiRouter.get('/', async (req, res, next) => {
    try {
        const list = await wiService.findAll();
        res.json(list);
    }
    catch (err) {
        next(err);
    }
});
/** GET /api/welfare-indicators/:id */
wiRouter.get('/:id', async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const item = await wiService.findOne(id);
        if (!item)
            return res.status(404).json({ message: 'WelfareIndicator not found' });
        res.json(item);
    }
    catch (err) {
        next(err);
    }
});
/** POST /api/welfare-indicators */
wiRouter.post('/', async (req, res, next) => {
    try {
        const data = req.body;
        const newItem = await wiService.create(data);
        res.status(201).json(newItem);
    }
    catch (err) {
        next(err);
    }
});
/** PUT /api/welfare-indicators/:id */
wiRouter.put('/:id', async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const data = req.body;
        const updated = await wiService.update(id, data);
        if (!updated)
            return res.status(404).json({ message: 'WelfareIndicator not found' });
        res.json(updated);
    }
    catch (err) {
        next(err);
    }
});
/** DELETE /api/welfare-indicators/:id */
wiRouter.delete('/:id', async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        await wiService.delete(id);
        res.status(204).send();
    }
    catch (err) {
        next(err);
    }
});
exports.default = wiRouter;
