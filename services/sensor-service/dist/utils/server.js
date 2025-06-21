"use strict";
// services/sensor-service/src/server.ts
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const config_1 = require("../configs/config");
const dataSource_1 = require("../utils/dataSource");
const sensorRoutes_1 = __importStar(require("../routes/sensorRoutes"));
const sensorDataModel_1 = require("../models/sensorDataModel");
const config_2 = require("../configs/config");
async function bootstrap() {
    // 1. เชื่อมต่อฐานข้อมูล
    await dataSource_1.AppDataSource.initialize();
    console.log("🔗 Database connected");
    // 2. Subscribe topic รูปแบบ sensor/{deviceId}/data
    config_1.mqttClient.subscribe("sensor/+/data");
    console.log("☕ Subscribed to sensor/+/data");
    // 3. รับข้อความจาก MQTT
    config_1.mqttClient.on("message", async (topic, payloadBuf) => {
        try {
            const parts = topic.split("/");
            const deviceId = Number(parts[1]);
            if (isNaN(deviceId)) {
                console.warn("Invalid deviceId in topic:", topic);
                return;
            }
            // payload เป็น JSON: { "metric": "...", "value": ... }
            const data = JSON.parse(payloadBuf.toString());
            const metric = data.metric;
            const value = Number(data.value);
            // สร้าง entity สำหรับบันทึก
            const sd = new sensorDataModel_1.SensorData();
            sd.time = new Date();
            sd.deviceId = deviceId;
            sd.topic = metric;
            sd.value = value;
            sd.rawPayload = data;
            // บันทึกลงฐานข้อมูล และอัปเดต cache
            await dataSource_1.AppDataSource.manager.save(sd);
            (0, sensorRoutes_1.updateSensorData)(sd);
            console.log(`💾 [Device ${deviceId}] ${metric} = ${value}`);
        }
        catch (err) {
            console.error("❌ Error handling MQTT message:", err);
        }
    });
    // 4. สตาร์ท Express server
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    app.use("/sensor", sensorRoutes_1.default);
    app.listen(config_2.PORT, () => {
        console.log(`🚀 sensor-service listening on http://localhost:${config_2.PORT}`);
    });
}
bootstrap().catch((err) => {
    console.error("Bootstrap error:", err);
});
