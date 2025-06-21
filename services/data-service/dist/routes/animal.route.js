"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/animal.route.ts
const express_1 = require("express");
const animal_service_1 = require("../services/animal.service");
const router = (0, express_1.Router)();
const service = new animal_service_1.AnimalService();
/** GET /api/animals */
router.get('/animals', async (req, res, next) => {
    try {
        const animals = await service.findAll();
        res.json(animals);
    }
    catch (err) {
        next(err);
    }
});
/** GET /api/animals/:id */
router.get('/animals/:id', async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const animal = await service.findOne(id);
        if (!animal)
            return res.status(404).json({ message: 'Animal not found' });
        res.json(animal);
    }
    catch (err) {
        next(err);
    }
});
/** POST /api/animals */
router.post('/animals', async (req, res, next) => {
    try {
        const data = req.body;
        const newAnimal = await service.create(data);
        res.status(201).json(newAnimal);
    }
    catch (err) {
        next(err);
    }
});
/** PUT /api/animals/:id */
router.put('/animals/:id', async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const data = req.body;
        const updated = await service.update(id, data);
        if (!updated)
            return res.status(404).json({ message: 'Animal not found' });
        res.json(updated);
    }
    catch (err) {
        next(err);
    }
});
/** DELETE /api/animals/:id */
router.delete('/animals/:id', async (req, res, next) => {
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
