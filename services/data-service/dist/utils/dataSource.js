"use strict";
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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
// services\data-service\src\utils\dataSource.ts
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const dotenv = __importStar(require("dotenv"));
const path_1 = require("path");
const models_1 = require("../models");
// 1) โหลด .env จาก root ของโปรเจกต์
dotenv.config({ path: (0, path_1.join)(__dirname, '../../../../.env') });
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432', 10),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    schema: 'smart_farming',
    entities: [
        models_1.Customer,
        models_1.Subscription,
        models_1.Farm,
        models_1.House,
        models_1.DeviceGroup,
        models_1.DeviceType,
        models_1.Device,
        models_1.DeviceLog,
        models_1.DeviceStatusHistory,
        models_1.Animal,
        models_1.GeneticFactor,
        models_1.FeedBatch,
        models_1.FeedBatchAssignment,
        models_1.FeedProgram,
        models_1.FeedIntake,
        models_1.FeedComposition,
        models_1.EnvironmentalFactor,
        models_1.HousingCondition,
        models_1.WaterQuality,
        models_1.HealthRecord,
        models_1.WelfareIndicator,
        models_1.PerformanceMetric,
        models_1.OperationRecord,
        models_1.EconomicData,
        models_1.ExternalFactor,
        models_1.SensorData
    ],
    synchronize: false,
    logging: false
});
