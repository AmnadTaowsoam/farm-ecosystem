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
exports.FormulaAdditional = void 0;
// services/formula-service/src/models/formulaAdditional.model.ts
const typeorm_1 = require("typeorm");
const formula_model_1 = require("./formula.model");
let FormulaAdditional = class FormulaAdditional {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], FormulaAdditional.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'formula_id' }),
    __metadata("design:type", Number)
], FormulaAdditional.prototype, "formulaId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100 }),
    __metadata("design:type", String)
], FormulaAdditional.prototype, "item", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], FormulaAdditional.prototype, "details", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamptz' }),
    __metadata("design:type", Date)
], FormulaAdditional.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', type: 'timestamptz' }),
    __metadata("design:type", Date)
], FormulaAdditional.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => formula_model_1.Formula, (formula) => formula.additionals, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'formula_id' }),
    __metadata("design:type", formula_model_1.Formula)
], FormulaAdditional.prototype, "formula", void 0);
FormulaAdditional = __decorate([
    (0, typeorm_1.Entity)({ schema: 'formulas', name: 'formula_additional' })
], FormulaAdditional);
exports.FormulaAdditional = FormulaAdditional;
