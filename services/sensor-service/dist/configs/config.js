"use strict";
// services\sensor-service\src\config\config.ts
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
exports.mqttClient = exports.mqttOptions = exports.MQTT_BROKER_URL = exports.PORT = exports.DATABASE_URL = exports.DB_PASSWORD = exports.DB_USER = exports.DB_NAME = exports.DB_PORT = exports.DB_HOST = void 0;
const dotenv = __importStar(require("dotenv"));
const path_1 = require("path");
const mqtt_1 = __importDefault(require("mqtt"));
// โหลดค่าจากไฟล์ .env.common (อยู่ที่ services/.env.common)
dotenv.config({ path: (0, path_1.join)(__dirname, '../../../.env') });
// Database settings
exports.DB_HOST = process.env.DB_HOST ?? 'localhost';
exports.DB_PORT = Number(process.env.DB_PORT) || 5432;
exports.DB_NAME = process.env.DB_NAME ?? 'edge_db';
exports.DB_USER = process.env.DB_USER ?? 'postgres';
exports.DB_PASSWORD = process.env.DB_PASSWORD ?? 'password';
exports.DATABASE_URL = process.env.DATABASE_URL ||
    `postgresql://${exports.DB_USER}:${exports.DB_PASSWORD}@${exports.DB_HOST}:${exports.DB_PORT}/${exports.DB_NAME}`;
// Server port (แก้ไขให้ตรงกับ SENSOR_SERVICE_PORT)
exports.PORT = Number(process.env.SENSOR_SERVICE_PORT) || 4101;
// MQTT Broker settings
exports.MQTT_BROKER_URL = process.env.MQTT_BROKER_URL || 'mqtt://localhost:1883';
exports.mqttOptions = {
    clientId: "sensor-service-client-" + Math.random().toString(16).substr(2, 8),
    clean: true,
    connectTimeout: 4000,
    reconnectPeriod: 1000,
};
exports.mqttClient = mqtt_1.default.connect(exports.MQTT_BROKER_URL, exports.mqttOptions);
exports.mqttClient.on("connect", () => {
    console.log("MQTT connected to broker at", exports.MQTT_BROKER_URL);
});
exports.mqttClient.on("error", (err) => {
    console.error("MQTT connection error:", err);
});
exports.mqttClient.on("reconnect", () => {
    console.log("MQTT reconnecting...");
});
