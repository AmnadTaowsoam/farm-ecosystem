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
exports.PhysicalQuality = void 0;
// physicalQuality.model.ts
const typeorm_1 = require("typeorm");
const feedBatch_model_1 = require("../models/feedBatch.model");
let PhysicalQuality = class PhysicalQuality {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], PhysicalQuality.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'production_date', type: 'timestamptz' }),
    __metadata("design:type", Date)
], PhysicalQuality.prototype, "productionDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'feed_batch_id' }),
    __metadata("design:type", Number)
], PhysicalQuality.prototype, "feedBatchId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'property_name', length: 100 }),
    __metadata("design:type", String)
], PhysicalQuality.prototype, "propertyName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'property_value', type: 'numeric' }),
    __metadata("design:type", Number)
], PhysicalQuality.prototype, "propertyValue", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50, nullable: true }),
    __metadata("design:type", String)
], PhysicalQuality.prototype, "unit", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], PhysicalQuality.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => feedBatch_model_1.FeedBatch, (feedBatch) => undefined, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)([
        { name: 'production_date', referencedColumnName: 'productionDate' },
        { name: 'feed_batch_id', referencedColumnName: 'feedBatchId' },
    ]),
    __metadata("design:type", feedBatch_model_1.FeedBatch)
], PhysicalQuality.prototype, "feedBatch", void 0);
PhysicalQuality = __decorate([
    (0, typeorm_1.Entity)({ schema: 'feeds', name: 'physical_quality' })
], PhysicalQuality);
exports.PhysicalQuality = PhysicalQuality;
