"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/sensor.route.ts
const express_1 = require("express");
const sensor_service_1 = require("../services/sensor.service");
const sensorRouter = (0, express_1.Router)();
const sensorService = new sensor_service_1.SensorService();
/** GET /api/sensor-data */
sensorRouter.get('/sensor-data', async (req, res, next) => {
    try {
        const list = await sensorService.findAll();
        res.json(list);
    }
    catch (err) {
        next(err);
    }
});
/** GET /api/sensor-data */
// expects query params time, device_id, topic
sensorRouter.get('/sensor-data/item', async (req, res, next) => {
    try {
        const { time, device_id, topic } = req.query;
        const item = await sensorService.findOne(new Date(time), Number(device_id), topic);
        if (!item)
            return res.status(404).json({ message: 'SensorData not found' });
        res.json(item);
    }
    catch (err) {
        next(err);
    }
});
/** POST /api/sensor-data */
sensorRouter.post('/sensor-data', async (req, res, next) => {
    try {
        const data = req.body;
        const newItem = await sensorService.create(data);
        res.status(201).json(newItem);
    }
    catch (err) {
        next(err);
    }
});
/** PUT /api/sensor-data */
// expects time, device_id, topic in body to identify record
sensorRouter.put('/sensor-data', async (req, res, next) => {
    try {
        const { time, device_id, topic, ...data } = req.body;
        const updated = await sensorService.update(new Date(time), device_id, topic, data);
        if (!updated)
            return res.status(404).json({ message: 'SensorData not found' });
        res.json(updated);
    }
    catch (err) {
        next(err);
    }
});
/** DELETE /api/sensor-data */
// expects time, device_id, topic in query
sensorRouter.delete('/sensor-data', async (req, res, next) => {
    try {
        const { time, device_id, topic } = req.query;
        await sensorService.delete(new Date(time), Number(device_id), topic);
        res.status(204).send();
    }
    catch (err) {
        next(err);
    }
});
exports.default = sensorRouter;
