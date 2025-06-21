"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/feedBatch.route.ts
const express_1 = require("express");
const feedBatch_service_1 = require("../services/feedBatch.service");
const router = (0, express_1.Router)();
const service = new feedBatch_service_1.FeedBatchService();
/** GET /api/feed-batches */
router.get('/feed-batches', async (req, res, next) => {
    try {
        const list = await service.findAll();
        res.json(list);
    }
    catch (err) {
        next(err);
    }
});
/** GET /api/feed-batches/:id */
router.get('/feed-batches/:id', async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const item = await service.findOne(id);
        if (!item)
            return res.status(404).json({ message: 'FeedBatch not found' });
        res.json(item);
    }
    catch (err) {
        next(err);
    }
});
/** POST /api/feed-batches */
router.post('/feed-batches', async (req, res, next) => {
    try {
        const data = req.body;
        const newItem = await service.create(data);
        res.status(201).json(newItem);
    }
    catch (err) {
        next(err);
    }
});
/** PUT /api/feed-batches/:id */
router.put('/feed-batches/:id', async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const data = req.body;
        const updated = await service.update(id, data);
        if (!updated)
            return res.status(404).json({ message: 'FeedBatch not found' });
        res.json(updated);
    }
    catch (err) {
        next(err);
    }
});
/** DELETE /api/feed-batches/:id */
router.delete('/feed-batches/:id', async (req, res, next) => {
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
