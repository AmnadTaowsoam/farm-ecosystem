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
exports.DeviceStatusHistory = void 0;
// src/models/deviceStatusHistory.model.ts
const typeorm_1 = require("typeorm");
const device_model_1 = require("./device.model");
let DeviceStatusHistory = class DeviceStatusHistory {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], DeviceStatusHistory.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], DeviceStatusHistory.prototype, "device_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => device_model_1.Device, device => device.status_history, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'device_id' }),
    __metadata("design:type", device_model_1.Device)
], DeviceStatusHistory.prototype, "device", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100, nullable: true }),
    __metadata("design:type", String)
], DeviceStatusHistory.prototype, "performed_by", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50 }),
    __metadata("design:type", String)
], DeviceStatusHistory.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamptz', default: () => 'NOW()' }),
    __metadata("design:type", Date)
], DeviceStatusHistory.prototype, "changed_at", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", String)
], DeviceStatusHistory.prototype, "note", void 0);
DeviceStatusHistory = __decorate([
    (0, typeorm_1.Entity)({ name: 'device_status_history' })
], DeviceStatusHistory);
exports.DeviceStatusHistory = DeviceStatusHistory;
