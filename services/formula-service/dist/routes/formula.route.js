"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// services/formula-service/src/routes/formula.route.ts
const express_1 = require("express");
const formula_service_1 = require("../services/formula.service");
const router = (0, express_1.Router)();
const service = new formula_service_1.FormulaService();
// GET all formulas
router.get('/', async (_req, res) => {
    const formulas = await service.findAll();
    res.json(formulas);
});
// GET formula by id
router.get('/:id', async (req, res) => {
    const id = Number(req.params.id);
    const formula = await service.findOneById(id);
    if (!formula)
        return res.status(404).json({ message: 'Formula not found' });
    res.json(formula);
});
// POST create formula
router.post('/', async (req, res) => {
    const newFormula = await service.create(req.body);
    res.status(201).json(newFormula);
});
// PUT update formula
router.put('/:id', async (req, res) => {
    const id = Number(req.params.id);
    const updated = await service.update(id, req.body);
    if (!updated)
        return res.status(404).json({ message: 'Formula not found' });
    res.json(updated);
});
// DELETE formula
router.delete('/:id', async (req, res) => {
    const id = Number(req.params.id);
    const deleted = await service.delete(id);
    if (!deleted)
        return res.status(404).json({ message: 'Formula not found' });
    res.status(204).send();
});
exports.default = router;
