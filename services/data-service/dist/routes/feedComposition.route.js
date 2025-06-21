"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/feedComposition.route.ts
const express_1 = require("express");
const feedComposition_service_1 = require("../services/feedComposition.service");
const compRouter = (0, express_1.Router)();
const compService = new feedComposition_service_1.FeedCompositionService();
/** GET /api/feed-composition */
compRouter.get('/feed-composition', async (req, res, next) => {
    try {
        const list = await compService.findAll();
        res.json(list);
    }
    catch (err) {
        next(err);
    }
});
/** GET /api/feed-composition/:id */
compRouter.get('/feed-composition/:id', async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const item = await compService.findOne(id);
        if (!item)
            return res.status(404).json({ message: 'FeedComposition not found' });
        res.json(item);
    }
    catch (err) {
        next(err);
    }
});
/** POST /api/feed-composition */
compRouter.post('/feed-composition', async (req, res, next) => {
    try {
        const data = req.body;
        const newItem = await compService.create(data);
        res.status(201).json(newItem);
    }
    catch (err) {
        next(err);
    }
});
/** PUT /api/feed-composition/:id */
compRouter.put('/feed-composition/:id', async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const data = req.body;
        const updated = await compService.update(id, data);
        if (!updated)
            return res.status(404).json({ message: 'FeedComposition not found' });
        res.json(updated);
    }
    catch (err) {
        next(err);
    }
});
/** DELETE /api/feed-composition/:id */
compRouter.delete('/feed-composition/:id', async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        await compService.delete(id);
        res.status(204).send();
    }
    catch (err) {
        next(err);
    }
});
exports.default = compRouter;
