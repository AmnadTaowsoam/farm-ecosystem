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
exports.House = void 0;
// services/sensor-service/src/models/houseModel.ts
const typeorm_1 = require("typeorm");
const deviceModel_1 = require("./deviceModel");
let House = class House {
};
exports.House = House;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: "house_id" }),
    __metadata("design:type", Number)
], House.prototype, "houseId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "farm_id", type: "int", nullable: false }),
    __metadata("design:type", Number)
], House.prototype, "farmId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 100, nullable: true }),
    __metadata("design:type", String)
], House.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "numeric", nullable: true }),
    __metadata("design:type", Number)
], House.prototype, "area", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int", nullable: true }),
    __metadata("design:type", Number)
], House.prototype, "capacity", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: "timestamptz", name: "created_at" }),
    __metadata("design:type", Date)
], House.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => deviceModel_1.Device, (device) => device.house),
    __metadata("design:type", Array)
], House.prototype, "devices", void 0);
exports.House = House = __decorate([
    (0, typeorm_1.Entity)({ schema: "smart_farming", name: "houses" })
], House);
