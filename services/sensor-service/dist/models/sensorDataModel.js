"use strict";
// services/sensor-service/src/models/sensorDataModel.ts
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SensorData = void 0;
const typeorm_1 = require("typeorm");
let SensorData = class SensorData {
};
exports.SensorData = SensorData;
__decorate([
    (0, typeorm_1.PrimaryColumn)({ type: "timestamptz", name: "time" }),
    __metadata("design:type", Date)
], SensorData.prototype, "time", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)({ type: "int", name: "device_id" }),
    __metadata("design:type", Number)
], SensorData.prototype, "deviceId", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)({ type: "text", name: "topic" }),
    __metadata("design:type", String)
], SensorData.prototype, "topic", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "double precision", nullable: false }),
    __metadata("design:type", Number)
], SensorData.prototype, "value", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "jsonb", nullable: true, name: "raw_payload" }),
    __metadata("design:type", Object)
], SensorData.prototype, "rawPayload", void 0);
exports.SensorData = SensorData = __decorate([
    (0, typeorm_1.Entity)({ schema: "smart_farming", name: "sensor_data" }),
    (0, typeorm_1.Index)("idx_sensor_data_device_time", ["deviceId", "time"], { unique: false }),
    (0, typeorm_1.Index)("idx_sensor_data_topic_time", ["topic", "time"], { unique: false })
], SensorData);
