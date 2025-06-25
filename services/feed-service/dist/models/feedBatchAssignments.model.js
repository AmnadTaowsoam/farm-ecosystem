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
exports.FeedBatchAssignment = void 0;
// feedBatchAssignments.model.ts
const typeorm_1 = require("typeorm");
const feedBatch_model_1 = require("../models/feedBatch.model");
let FeedBatchAssignment = class FeedBatchAssignment {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'assignment_id' }),
    __metadata("design:type", Number)
], FeedBatchAssignment.prototype, "assignmentId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'production_date', type: 'timestamptz' }),
    __metadata("design:type", Date)
], FeedBatchAssignment.prototype, "productionDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'feed_batch_id' }),
    __metadata("design:type", Number)
], FeedBatchAssignment.prototype, "feedBatchId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], FeedBatchAssignment.prototype, "farmId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], FeedBatchAssignment.prototype, "houseId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], FeedBatchAssignment.prototype, "animalId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'assigned_start', type: 'timestamptz' }),
    __metadata("design:type", Date)
], FeedBatchAssignment.prototype, "assignedStart", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'assigned_end', type: 'timestamptz', nullable: true }),
    __metadata("design:type", Date)
], FeedBatchAssignment.prototype, "assignedEnd", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'feed_quantity', type: 'numeric', nullable: true }),
    __metadata("design:type", Number)
], FeedBatchAssignment.prototype, "feedQuantity", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'text' }),
    __metadata("design:type", String)
], FeedBatchAssignment.prototype, "note", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], FeedBatchAssignment.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], FeedBatchAssignment.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => feedBatch_model_1.FeedBatch, (feedBatch) => undefined, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)([
        { name: 'production_date', referencedColumnName: 'productionDate' },
        { name: 'feed_batch_id', referencedColumnName: 'feedBatchId' },
    ]),
    __metadata("design:type", feedBatch_model_1.FeedBatch)
], FeedBatchAssignment.prototype, "feedBatch", void 0);
FeedBatchAssignment = __decorate([
    (0, typeorm_1.Entity)({ schema: 'feeds', name: 'feed_batch_assignments' })
], FeedBatchAssignment);
exports.FeedBatchAssignment = FeedBatchAssignment;
