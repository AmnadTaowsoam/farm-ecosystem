"use strict";
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
exports.DeviceLog = void 0;
// src/models/deviceLogs.model.ts
const typeorm_1 = require("typeorm");
const device_model_1 = require("./device.model");
let DeviceLog = class DeviceLog {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'log_id' }),
    __metadata("design:type", Number)
], DeviceLog.prototype, "log_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], DeviceLog.prototype, "device_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => device_model_1.Device, device => device.sensor_data, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'device_id' }),
    __metadata("design:type", device_model_1.Device)
], DeviceLog.prototype, "device", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50 }),
    __metadata("design:type", String)
], DeviceLog.prototype, "event_type", void 0);
__decorate([
    (0, typeorm_1.Column)('jsonb', { nullable: true }),
    __metadata("design:type", Object)
], DeviceLog.prototype, "event_data", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100, nullable: true }),
    __metadata("design:type", String)
], DeviceLog.prototype, "performed_by", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamptz', name: 'created_at' }),
    __metadata("design:type", Date)
], DeviceLog.prototype, "created_at", void 0);
DeviceLog = __decorate([
    (0, typeorm_1.Entity)({ name: 'device_logs' })
], DeviceLog);
exports.DeviceLog = DeviceLog;
