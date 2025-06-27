"use strict";
// services/external-factor-service/src/models/externalFactors.model.ts
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
exports.ExternalFactors = void 0;
const typeorm_1 = require("typeorm");
let ExternalFactors = class ExternalFactors {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id' }),
    __metadata("design:type", Number)
], ExternalFactors.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'farm_id', type: 'integer', nullable: true }),
    __metadata("design:type", Number)
], ExternalFactors.prototype, "farmId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'weather', type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], ExternalFactors.prototype, "weather", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'disease_alert', type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], ExternalFactors.prototype, "diseaseAlert", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'market_price', type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], ExternalFactors.prototype, "marketPrice", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'feed_supply', type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], ExternalFactors.prototype, "feedSupply", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'weather_forecast', type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], ExternalFactors.prototype, "weatherForecast", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'disease_risk_score', type: 'numeric', nullable: true }),
    __metadata("design:type", Number)
], ExternalFactors.prototype, "diseaseRiskScore", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'regulatory_changes', type: 'text', nullable: true }),
    __metadata("design:type", String)
], ExternalFactors.prototype, "regulatoryChanges", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'record_date', type: 'date' }),
    __metadata("design:type", String)
], ExternalFactors.prototype, "recordDate", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamptz' }),
    __metadata("design:type", Date)
], ExternalFactors.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', type: 'timestamptz' }),
    __metadata("design:type", Date)
], ExternalFactors.prototype, "updatedAt", void 0);
ExternalFactors = __decorate([
    (0, typeorm_1.Entity)({ schema: 'external_factors', name: 'external_factors' }),
    (0, typeorm_1.Index)('idx_external_factors_farm_id', ['farmId']),
    (0, typeorm_1.Index)('idx_external_factors_record_date', ['recordDate'])
], ExternalFactors);
exports.ExternalFactors = ExternalFactors;
