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
// src/models/feedBatchAssign.model.ts
const typeorm_1 = require("typeorm");
const device_model_1 = require("./device.model");
let FeedBatchAssignment = class FeedBatchAssignment {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'assignment_id' }),
    __metadata("design:type", Number)
], FeedBatchAssignment.prototype, "assignment_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], FeedBatchAssignment.prototype, "feed_batch_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], FeedBatchAssignment.prototype, "farm_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], FeedBatchAssignment.prototype, "house_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], FeedBatchAssignment.prototype, "animal_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamptz' }),
    __metadata("design:type", Date)
], FeedBatchAssignment.prototype, "assigned_start", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamptz', nullable: true }),
    __metadata("design:type", Date)
], FeedBatchAssignment.prototype, "assigned_end", void 0);
__decorate([
    (0, typeorm_1.Column)('numeric', { nullable: true }),
    __metadata("design:type", Number)
], FeedBatchAssignment.prototype, "feed_quantity", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", String)
], FeedBatchAssignment.prototype, "note", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamptz' }),
    __metadata("design:type", Date)
], FeedBatchAssignment.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], FeedBatchAssignment.prototype, "device_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => device_model_1.Device, device => device.feed_assignments, {
        nullable: true,
        onDelete: 'SET NULL',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'device_id' }),
    __metadata("design:type", device_model_1.Device)
], FeedBatchAssignment.prototype, "device", void 0);
FeedBatchAssignment = __decorate([
    (0, typeorm_1.Entity)({ name: 'feed_batch_assignments' })
], FeedBatchAssignment);
exports.FeedBatchAssignment = FeedBatchAssignment;
