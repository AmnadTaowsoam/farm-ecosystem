"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/feedProgram.route.ts
const express_1 = require("express");
const feedProgram_service_1 = require("../services/feedProgram.service");
const router = (0, express_1.Router)();
const service = new feedProgram_service_1.FeedProgramService();
/** GET /api/feed-programs */
router.get('/feed-programs', async (req, res, next) => {
    try {
        const programs = await service.findAll();
        res.json(programs);
    }
    catch (err) {
        next(err);
    }
});
/** GET /api/feed-programs/:id */
router.get('/feed-programs/:id', async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const program = await service.findOne(id);
        if (!program)
            return res.status(404).json({ message: 'FeedProgram not found' });
        res.json(program);
    }
    catch (err) {
        next(err);
    }
});
/** POST /api/feed-programs */
router.post('/feed-programs', async (req, res, next) => {
    try {
        const data = req.body;
        const newProgram = await service.create(data);
        res.status(201).json(newProgram);
    }
    catch (err) {
        next(err);
    }
});
/** PUT /api/feed-programs/:id */
router.put('/feed-programs/:id', async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const data = req.body;
        const updated = await service.update(id, data);
        if (!updated)
            return res.status(404).json({ message: 'FeedProgram not found' });
        res.json(updated);
    }
    catch (err) {
        next(err);
    }
});
/** DELETE /api/feed-programs/:id */
router.delete('/feed-programs/:id', async (req, res, next) => {
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
