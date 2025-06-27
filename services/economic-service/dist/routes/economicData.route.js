"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// services/economic-service/src/routes/economicData.route.ts
const express_1 = require("express");
const economicData_service_1 = __importDefault(require("../services/economicData.service"));
const router = (0, express_1.Router)();
// GET /economic-data
router.get('/', async (_req, res, next) => {
    try {
        const list = await economicData_service_1.default.findAll();
        res.json(list);
    }
    catch (err) {
        next(err);
    }
});
// GET /economic-data/:id
router.get('/:id', async (req, res, next) => {
    try {
        const data = await economicData_service_1.default.findById(+req.params.id);
        if (!data)
            return res.status(404).json({ message: 'Not found' });
        res.json(data);
    }
    catch (err) {
        next(err);
    }
});
// POST /economic-data
router.post('/', async (req, res, next) => {
    try {
        const created = await economicData_service_1.default.create(req.body);
        res.status(201).json(created);
    }
    catch (err) {
        next(err);
    }
});
// PUT /economic-data/:id
router.put('/:id', async (req, res, next) => {
    try {
        const updated = await economicData_service_1.default.update(+req.params.id, req.body);
        res.json(updated);
    }
    catch (err) {
        next(err);
    }
});
// DELETE /economic-data/:id
router.delete('/:id', async (req, res, next) => {
    try {
        await economicData_service_1.default.delete(+req.params.id);
        res.sendStatus(204);
    }
    catch (err) {
        next(err);
    }
});
exports.default = router;
