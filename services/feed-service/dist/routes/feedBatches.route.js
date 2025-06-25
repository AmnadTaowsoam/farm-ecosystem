"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.feedBatchesRouter = void 0;
// feedBatches.route.ts
const express_1 = require("express");
const feedBatches_service_1 = require("../services/feedBatches.service");
const feedBatch_model_1 = require("../models/feedBatch.model");
function feedBatchesRouter(dataSource) {
    const repo = dataSource.getRepository(feedBatch_model_1.FeedBatch);
    const service = new feedBatches_service_1.FeedBatchesService(repo);
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
    router.get('/:productionDate/:feedBatchId', async (req, res) => {
        const { productionDate, feedBatchId } = req.params;
        const entity = await service.findById(new Date(productionDate), Number(feedBatchId));
        if (!entity)
            return res.status(404).json({ error: 'Not found' });
        res.json(entity);
    });
    router.put('/:productionDate/:feedBatchId', async (req, res) => {
        const { productionDate, feedBatchId } = req.params;
        try {
            const updated = await service.update(new Date(productionDate), Number(feedBatchId), req.body);
            if (!updated)
                return res.status(404).json({ error: 'Not found' });
            res.json(updated);
        }
        catch (e) {
            res.status(400).json({ error: e.message });
        }
    });
    router.delete('/:productionDate/:feedBatchId', async (req, res) => {
        const { productionDate, feedBatchId } = req.params;
        await service.delete(new Date(productionDate), Number(feedBatchId));
        res.status(204).send();
    });
    return router;
}
exports.feedBatchesRouter = feedBatchesRouter;
