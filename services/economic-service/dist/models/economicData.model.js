"use strict";
// services/economic-service/src/models/economicData.model.ts
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
const typeorm_1 = require("typeorm");
let EconomicData = class EconomicData {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id' }),
    __metadata("design:type", Number)
], EconomicData.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'farm_id', type: 'integer', nullable: true }),
    __metadata("design:type", Number)
], EconomicData.prototype, "farmId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'cost_type', type: 'varchar', length: 100 }),
    __metadata("design:type", String)
], EconomicData.prototype, "costType", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'amount', type: 'numeric', nullable: true }),
    __metadata("design:type", Number)
], EconomicData.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'animal_price', type: 'numeric', nullable: true }),
    __metadata("design:type", Number)
], EconomicData.prototype, "animalPrice", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'feed_cost', type: 'numeric', nullable: true }),
    __metadata("design:type", Number)
], EconomicData.prototype, "feedCost", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'labor_cost', type: 'numeric', nullable: true }),
    __metadata("design:type", Number)
], EconomicData.prototype, "laborCost", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'utility_cost', type: 'numeric', nullable: true }),
    __metadata("design:type", Number)
], EconomicData.prototype, "utilityCost", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'medication_cost', type: 'numeric', nullable: true }),
    __metadata("design:type", Number)
], EconomicData.prototype, "medicationCost", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'maintenance_cost', type: 'numeric', nullable: true }),
    __metadata("design:type", Number)
], EconomicData.prototype, "maintenanceCost", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'other_costs', type: 'numeric', nullable: true }),
    __metadata("design:type", Number)
], EconomicData.prototype, "otherCosts", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'record_date', type: 'date' }),
    __metadata("design:type", String)
], EconomicData.prototype, "recordDate", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamptz' }),
    __metadata("design:type", Date)
], EconomicData.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', type: 'timestamptz' }),
    __metadata("design:type", Date)
], EconomicData.prototype, "updatedAt", void 0);
EconomicData = __decorate([
    (0, typeorm_1.Entity)({ schema: 'economics', name: 'economic_data' }),
    (0, typeorm_1.Index)('idx_economic_data_farm_id', ['farmId']),
    (0, typeorm_1.Index)('idx_economic_data_record_date', ['recordDate'])
], EconomicData);
exports.EconomicData = EconomicData;
