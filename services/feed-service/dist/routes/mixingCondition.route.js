"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mixingConditionRouter = void 0;
// mixingCondition.route.ts
const express_1 = require("express");
const mixingCondition_service_1 = require("../services/mixingCondition.service");
const mixingCondition_model_1 = require("../models/mixingCondition.model");
function mixingConditionRouter(dataSource) {
    const repo = dataSource.getRepository(mixingCondition_model_1.MixingCondition);
    const service = new mixingCondition_service_1.MixingConditionService(repo);
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
exports.mixingConditionRouter = mixingConditionRouter;
