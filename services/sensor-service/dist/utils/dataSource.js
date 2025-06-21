"use strict";
// services/sensor-service/src/utils/data-source.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const sensorDataModel_1 = require("../models/sensorDataModel");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    url: process.env.DATABASE_URL, // หรือ config ตามที่ตั้งไว้
    synchronize: false, // แนะนำ false สำหรับ production
    logging: false,
    entities: [sensorDataModel_1.SensorData],
    schema: "smart_farming",
    // อื่น ๆ ตาม config เช่น ssl, pool size
});
