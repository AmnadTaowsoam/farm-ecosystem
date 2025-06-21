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
exports.EconomicData = void 0;
// src/models/economicData.model.ts
const typeorm_1 = require("typeorm");
let EconomicData = class EconomicData {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], EconomicData.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], EconomicData.prototype, "farm_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100 }),
    __metadata("design:type", String)
], EconomicData.prototype, "cost_type", void 0);
__decorate([
    (0, typeorm_1.Column)('numeric', { nullable: true }),
    __metadata("design:type", Number)
], EconomicData.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.Column)('numeric', { nullable: true }),
    __metadata("design:type", Number)
], EconomicData.prototype, "animal_price", void 0);
__decorate([
    (0, typeorm_1.Column)('numeric', { nullable: true }),
    __metadata("design:type", Number)
], EconomicData.prototype, "feed_cost", void 0);
__decorate([
    (0, typeorm_1.Column)('numeric', { nullable: true }),
    __metadata("design:type", Number)
], EconomicData.prototype, "labor_cost", void 0);
__decorate([
    (0, typeorm_1.Column)('numeric', { nullable: true }),
    __metadata("design:type", Number)
], EconomicData.prototype, "utility_cost", void 0);
__decorate([
    (0, typeorm_1.Column)('numeric', { nullable: true }),
    __metadata("design:type", Number)
], EconomicData.prototype, "medication_cost", void 0);
__decorate([
    (0, typeorm_1.Column)('numeric', { nullable: true }),
    __metadata("design:type", Number)
], EconomicData.prototype, "maintenance_cost", void 0);
__decorate([
    (0, typeorm_1.Column)('numeric', { nullable: true }),
    __metadata("design:type", Number)
], EconomicData.prototype, "other_costs", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: true }),
    __metadata("design:type", String)
], EconomicData.prototype, "record_date", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamptz' }),
    __metadata("design:type", Date)
], EconomicData.prototype, "created_at", void 0);
EconomicData = __decorate([
    (0, typeorm_1.Entity)({ name: 'economic_data' })
], EconomicData);
exports.EconomicData = EconomicData;
