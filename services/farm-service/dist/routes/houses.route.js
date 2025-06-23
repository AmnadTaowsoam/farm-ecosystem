"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/house.route.ts
const express_1 = require("express");
const houses_service_1 = require("../services/houses.service");
const router = (0, express_1.Router)();
const service = new houses_service_1.HouseService();
/** GET /api/houses */
router.get('/', async (req, res, next) => {
    try {
        const houses = await service.findAll();
        res.json(houses);
    }
    catch (err) {
        next(err);
    }
});
/** GET /api/houses/:id */
router.get('/:id', async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const house = await service.findOne(id);
        if (!house)
            return res.status(404).json({ message: 'House not found' });
        res.json(house);
    }
    catch (err) {
        next(err);
    }
});
/** POST /api/houses */
router.post('/', async (req, res, next) => {
    try {
        const data = req.body;
        const newHouse = await service.create(data);
        res.status(201).json(newHouse);
    }
    catch (err) {
        next(err);
    }
});
/** PUT /api/houses/:id */
router.put('/:id', async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const data = req.body;
        const updated = await service.update(id, data);
        if (!updated)
            return res.status(404).json({ message: 'House not found' });
        res.json(updated);
    }
    catch (err) {
        next(err);
    }
});
/** DELETE /api/houses/:id */
router.delete('/:id', async (req, res, next) => {
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
