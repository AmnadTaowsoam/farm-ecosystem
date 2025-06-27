"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// services/external-factor-service/src/routes/externalFactors.route.ts
const express_1 = require("express");
const externalFactors_service_1 = __importDefault(require("../services/externalFactors.service"));
const router = (0, express_1.Router)();
// GET /external-factors
router.get('/', async (_req, res, next) => {
    try {
        const list = await externalFactors_service_1.default.findAll();
        res.json(list);
    }
    catch (err) {
        next(err);
    }
});
// GET /external-factors/:id
router.get('/:id', async (req, res, next) => {
    try {
        const item = await externalFactors_service_1.default.findById(+req.params.id);
        if (!item)
            return res.status(404).json({ message: 'Not found' });
        res.json(item);
    }
    catch (err) {
        next(err);
    }
});
// POST /external-factors
router.post('/', async (req, res, next) => {
    try {
        const created = await externalFactors_service_1.default.create(req.body);
        res.status(201).json(created);
    }
    catch (err) {
        next(err);
    }
});
// PUT /external-factors/:id
router.put('/:id', async (req, res, next) => {
    try {
        const updated = await externalFactors_service_1.default.update(+req.params.id, req.body);
        res.json(updated);
    }
    catch (err) {
        next(err);
    }
});
// DELETE /external-factors/:id
router.delete('/:id', async (req, res, next) => {
    try {
        await externalFactors_service_1.default.delete(+req.params.id);
        res.sendStatus(204);
    }
    catch (err) {
        next(err);
    }
});
exports.default = router;
