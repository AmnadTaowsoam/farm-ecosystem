"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chemicalQualityRouter = void 0;
// chemicalQuality.route.ts
const express_1 = require("express");
const chemicalQuality_service_1 = require("../services/chemicalQuality.service");
const chemicalQuality_model_1 = require("../models/chemicalQuality.model");
function chemicalQualityRouter(dataSource) {
    const repo = dataSource.getRepository(chemicalQuality_model_1.ChemicalQuality);
    const service = new chemicalQuality_service_1.ChemicalQualityService(repo);
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
exports.chemicalQualityRouter = chemicalQualityRouter;
