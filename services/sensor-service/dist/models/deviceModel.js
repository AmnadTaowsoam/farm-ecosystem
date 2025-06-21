"use strict";
// services/sensor-service/src/models/deviceModel.ts
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
const typeorm_1 = require("typeorm");
const houseModel_1 = require("./houseModel");
let Device = class Device {
};
exports.Device = Device;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: "device_id" }),
    __metadata("design:type", Number)
], Device.prototype, "deviceId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "house_id", type: "int", nullable: false }),
    __metadata("design:type", Number)
], Device.prototype, "houseId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => houseModel_1.House, (house) => house.devices, { onDelete: "CASCADE" }),
    (0, typeorm_1.JoinColumn)({ name: "house_id" }),
    __metadata("design:type", houseModel_1.House)
], Device.prototype, "house", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "type", type: "varchar", length: 100, nullable: true }),
    __metadata("design:type", String)
], Device.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "model", type: "varchar", length: 100, nullable: true }),
    __metadata("design:type", String)
], Device.prototype, "model", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "serial_number", type: "varchar", length: 100, nullable: true }),
    __metadata("design:type", String)
], Device.prototype, "serialNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "install_date", type: "date", nullable: true }),
    __metadata("design:type", Date)
], Device.prototype, "installDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "calibration_date", type: "date", nullable: true }),
    __metadata("design:type", Date)
], Device.prototype, "calibrationDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "last_maintenance", type: "date", nullable: true }),
    __metadata("design:type", Date)
], Device.prototype, "lastMaintenance", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "location_detail", type: "text", nullable: true }),
    __metadata("design:type", String)
], Device.prototype, "locationDetail", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "status", type: "varchar", length: 50, default: "active" }),
    __metadata("design:type", String)
], Device.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: "created_at", type: "timestamptz" }),
    __metadata("design:type", Date)
], Device.prototype, "createdAt", void 0);
exports.Device = Device = __decorate([
    (0, typeorm_1.Entity)({ schema: "smart_farming", name: "devices" }),
    (0, typeorm_1.Index)("idx_devices_house_id", ["houseId"])
], Device);
