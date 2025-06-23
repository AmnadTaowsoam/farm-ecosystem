"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/operationRecord.route.ts
const express_1 = require("express");
const operationRecord_service_1 = require("../services/operationRecord.service");
const orRouter = (0, express_1.Router)();
const orService = new operationRecord_service_1.OperationRecordService();
/** GET /api/operational-records */
orRouter.get('/', async (req, res, next) => {
    try {
        const list = await orService.findAll();
        res.json(list);
    }
    catch (err) {
        next(err);
    }
});
/** GET /api/operational-records/:id */
orRouter.get('/:id', async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const item = await orService.findOne(id);
        if (!item)
            return res.status(404).json({ message: 'OperationRecord not found' });
        res.json(item);
    }
    catch (err) {
        next(err);
    }
});
/** POST /api/operational-records */
orRouter.post('/', async (req, res, next) => {
    try {
        const data = req.body;
        const newItem = await orService.create(data);
        res.status(201).json(newItem);
    }
    catch (err) {
        next(err);
    }
});
/** PUT /api/operational-records/:id */
orRouter.put('/:id', async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const data = req.body;
        const updated = await orService.update(id, data);
        if (!updated)
            return res.status(404).json({ message: 'OperationRecord not found' });
        res.json(updated);
    }
    catch (err) {
        next(err);
    }
});
/** DELETE /api/operational-records/:id */
orRouter.delete('/:id', async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        await orService.delete(id);
        res.status(204).send();
    }
    catch (err) {
        next(err);
    }
});
exports.default = orRouter;
