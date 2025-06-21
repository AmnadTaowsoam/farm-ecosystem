"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/geneticFactor.route.ts
const express_1 = require("express");
const geneticFactor_service_1 = require("../services/geneticFactor.service");
const router = (0, express_1.Router)();
const service = new geneticFactor_service_1.GeneticFactorService();
/** GET /api/genetic-factors */
router.get('/genetic-factors', async (req, res, next) => {
    try {
        const list = await service.findAll();
        res.json(list);
    }
    catch (err) {
        next(err);
    }
});
/** GET /api/genetic-factors/:id */
router.get('/genetic-factors/:id', async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const item = await service.findOne(id);
        if (!item)
            return res.status(404).json({ message: 'GeneticFactor not found' });
        res.json(item);
    }
    catch (err) {
        next(err);
    }
});
/** POST /api/genetic-factors */
router.post('/genetic-factors', async (req, res, next) => {
    try {
        const data = req.body;
        const newItem = await service.create(data);
        res.status(201).json(newItem);
    }
    catch (err) {
        next(err);
    }
});
/** PUT /api/genetic-factors/:id */
router.put('/genetic-factors/:id', async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const data = req.body;
        const updated = await service.update(id, data);
        if (!updated)
            return res.status(404).json({ message: 'GeneticFactor not found' });
        res.json(updated);
    }
    catch (err) {
        next(err);
    }
});
/** DELETE /api/genetic-factors/:id */
router.delete('/genetic-factors/:id', async (req, res, next) => {
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
