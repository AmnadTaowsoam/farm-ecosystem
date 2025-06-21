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
exports.Device = void 0;
// src/models/device.model.ts
const typeorm_1 = require("typeorm");
const house_model_1 = require("./house.model");
const deviceTypes_model_1 = require("./deviceTypes.model");
const deviceGroup_model_1 = require("./deviceGroup.model");
const deviceStatusHistory_model_1 = require("./deviceStatusHistory.model");
const feedBatchAssign_model_1 = require("./feedBatchAssign.model");
const sensor_model_1 = require("./sensor.model");
let Device = class Device {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Device.prototype, "device_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Device.prototype, "house_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => house_model_1.House, house => house.devices, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'house_id' }),
    __metadata("design:type", house_model_1.House)
], Device.prototype, "house", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Device.prototype, "type_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => deviceTypes_model_1.DeviceType, dt => dt.devices, { nullable: true, onDelete: 'SET NULL' }),
    (0, typeorm_1.JoinColumn)({ name: 'type_id' }),
    __metadata("design:type", deviceTypes_model_1.DeviceType)
], Device.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Device.prototype, "group_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => deviceGroup_model_1.DeviceGroup, dg => dg.devices, { nullable: true, onDelete: 'SET NULL' }),
    (0, typeorm_1.JoinColumn)({ name: 'group_id' }),
    __metadata("design:type", deviceGroup_model_1.DeviceGroup)
], Device.prototype, "group", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100, nullable: true }),
    __metadata("design:type", String)
], Device.prototype, "model", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100, nullable: true }),
    __metadata("design:type", String)
], Device.prototype, "serial_number", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: true }),
    __metadata("design:type", String)
], Device.prototype, "install_date", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: true }),
    __metadata("design:type", String)
], Device.prototype, "calibration_date", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: true }),
    __metadata("design:type", String)
], Device.prototype, "last_maintenance", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", String)
], Device.prototype, "location_detail", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, nullable: true }),
    __metadata("design:type", String)
], Device.prototype, "manufacturer", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: true }),
    __metadata("design:type", String)
], Device.prototype, "purchase_date", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: true }),
    __metadata("design:type", String)
], Device.prototype, "warranty_expiry", void 0);
__decorate([
    (0, typeorm_1.Column)('jsonb', { nullable: true }),
    __metadata("design:type", Object)
], Device.prototype, "specs", void 0);
__decorate([
    (0, typeorm_1.Column)('numeric', { nullable: true }),
    __metadata("design:type", Number)
], Device.prototype, "location_latitude", void 0);
__decorate([
    (0, typeorm_1.Column)('numeric', { nullable: true }),
    __metadata("design:type", Number)
], Device.prototype, "location_longitude", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50, nullable: true }),
    __metadata("design:type", String)
], Device.prototype, "firmware_version", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 45, nullable: true }),
    __metadata("design:type", String)
], Device.prototype, "ip_address", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 17, nullable: true }),
    __metadata("design:type", String)
], Device.prototype, "mac_address", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamptz', nullable: true }),
    __metadata("design:type", Date)
], Device.prototype, "last_seen", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { array: true, default: () => "ARRAY[]::text[]" }),
    __metadata("design:type", Array)
], Device.prototype, "tags", void 0);
__decorate([
    (0, typeorm_1.Column)('jsonb', { nullable: true }),
    __metadata("design:type", Object)
], Device.prototype, "config", void 0);
__decorate([
    (0, typeorm_1.Column)('jsonb', { nullable: true }),
    __metadata("design:type", Object)
], Device.prototype, "credentials", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", String)
], Device.prototype, "build_code", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamptz', nullable: true }),
    __metadata("design:type", Date)
], Device.prototype, "build_date", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50, default: 'active' }),
    __metadata("design:type", String)
], Device.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamptz' }),
    __metadata("design:type", Date)
], Device.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => deviceStatusHistory_model_1.DeviceStatusHistory, sh => sh.device),
    __metadata("design:type", Array)
], Device.prototype, "status_history", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => feedBatchAssign_model_1.FeedBatchAssignment, fba => fba.device),
    __metadata("design:type", Array)
], Device.prototype, "feed_assignments", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => sensor_model_1.SensorData, sd => sd.device),
    __metadata("design:type", Array)
], Device.prototype, "sensor_data", void 0);
Device = __decorate([
    (0, typeorm_1.Entity)({ name: 'devices' })
], Device);
exports.Device = Device;
