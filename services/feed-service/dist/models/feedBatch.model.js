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
exports.FeedBatch = void 0;
// services\feed-service\src\models\feedBatch.model.ts
const typeorm_1 = require("typeorm");
let FeedBatch = class FeedBatch {
};
__decorate([
    (0, typeorm_1.PrimaryColumn)({ name: 'production_date', type: 'timestamptz' }),
    __metadata("design:type", Date)
], FeedBatch.prototype, "productionDate", void 0);
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'feed_batch_id' }),
    __metadata("design:type", Number)
], FeedBatch.prototype, "feedBatchId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], FeedBatch.prototype, "farmId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], FeedBatch.prototype, "formulaId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], FeedBatch.prototype, "formulaNo", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50, nullable: true }),
    __metadata("design:type", String)
], FeedBatch.prototype, "lineNo", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50, nullable: true }),
    __metadata("design:type", String)
], FeedBatch.prototype, "batchNo", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50, nullable: true }),
    __metadata("design:type", String)
], FeedBatch.prototype, "feedType", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], FeedBatch.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], FeedBatch.prototype, "updatedAt", void 0);
FeedBatch = __decorate([
    (0, typeorm_1.Entity)({ schema: 'feeds', name: 'feed_batches' }),
    (0, typeorm_1.Index)(['productionDate', 'feedBatchId'], { unique: true })
], FeedBatch);
exports.FeedBatch = FeedBatch;
