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
exports.ChemicalQuality = void 0;
// chemicalQuality.model.ts
const typeorm_1 = require("typeorm");
const feedBatch_model_1 = require("../models/feedBatch.model");
let ChemicalQuality = class ChemicalQuality {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ChemicalQuality.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'production_date', type: 'timestamptz' }),
    __metadata("design:type", Date)
], ChemicalQuality.prototype, "productionDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'feed_batch_id' }),
    __metadata("design:type", Number)
], ChemicalQuality.prototype, "feedBatchId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'nutrient_name', length: 100 }),
    __metadata("design:type", String)
], ChemicalQuality.prototype, "nutrientName", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'numeric' }),
    __metadata("design:type", Number)
], ChemicalQuality.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50, nullable: true }),
    __metadata("design:type", String)
], ChemicalQuality.prototype, "unit", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], ChemicalQuality.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => feedBatch_model_1.FeedBatch, (feedBatch) => undefined, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)([
        { name: 'production_date', referencedColumnName: 'productionDate' },
        { name: 'feed_batch_id', referencedColumnName: 'feedBatchId' },
    ]),
    __metadata("design:type", feedBatch_model_1.FeedBatch)
], ChemicalQuality.prototype, "feedBatch", void 0);
ChemicalQuality = __decorate([
    (0, typeorm_1.Entity)({ schema: 'feeds', name: 'chemical_quality' })
], ChemicalQuality);
exports.ChemicalQuality = ChemicalQuality;
