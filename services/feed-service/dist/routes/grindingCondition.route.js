"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.grindingConditionRouter = void 0;
// grindingCondition.route.ts
const express_1 = require("express");
const grindingCondition_service_1 = require("../services/grindingCondition.service");
const grindingCondition_model_1 = require("../models/grindingCondition.model");
function grindingConditionRouter(dataSource) {
    const repo = dataSource.getRepository(grindingCondition_model_1.GrindingCondition);
    const service = new grindingCondition_service_1.GrindingConditionService(repo);
    const router = (0, express_1.Router)();
    router.post('/', async (req, res) => {
        try {
            const result = await service.create(req.body);
            res.status(201).json(result);
        }
        catch (e) {
            res.status(400).json({ error: e.message });
        }
    });
    router.get('/', async (_, res) => {
        const list = await service.findAll();
        res.json(list);
    });
    router.get('/:id', async (req, res) => {
        const entity = await service.findById(Number(req.params.id));
        if (!entity)
            return res.status(404).json({ error: 'Not found' });
        res.json(entity);
    });
    router.put('/:id', async (req, res) => {
        try {
            const updated = await service.update(Number(req.params.id), req.body);
            if (!updated)
                return res.status(404).json({ error: 'Not found' });
            res.json(updated);
        }
        catch (e) {
            res.status(400).json({ error: e.message });
        }
    });
    router.delete('/:id', async (req, res) => {
        await service.delete(Number(req.params.id));
        res.status(204).send();
    });
    return router;
}
exports.grindingConditionRouter = grindingConditionRouter;
