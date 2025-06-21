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
exports.DeviceType = void 0;
// src/models/deviceTypes.model.ts
const typeorm_1 = require("typeorm");
const device_model_1 = require("./device.model");
let DeviceType = class DeviceType {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], DeviceType.prototype, "type_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100, unique: true }),
    __metadata("design:type", String)
], DeviceType.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50, nullable: true }),
    __metadata("design:type", String)
], DeviceType.prototype, "icon_css_class", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", String)
], DeviceType.prototype, "default_image_url", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => device_model_1.Device, device => device.type),
    __metadata("design:type", Array)
], DeviceType.prototype, "devices", void 0);
DeviceType = __decorate([
    (0, typeorm_1.Entity)({ name: 'device_types' })
], DeviceType);
exports.DeviceType = DeviceType;
