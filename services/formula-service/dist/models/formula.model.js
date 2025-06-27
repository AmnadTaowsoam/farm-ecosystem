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
exports.Formula = void 0;
// services/formula-service/src/models/formula.model.ts
const typeorm_1 = require("typeorm");
const formulaComposition_model_1 = require("../models/formulaComposition.model");
const formulaEnergy_model_1 = require("../models/formulaEnergy.model");
const formulaNutrition_model_1 = require("../models/formulaNutrition.model");
const formulaAdditional_model_1 = require("../models/formulaAdditional.model");
let Formula = class Formula {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'formula_id' }),
    __metadata("design:type", Number)
], Formula.prototype, "formulaId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'formula_no', type: 'varchar', length: 50 }),
    __metadata("design:type", String)
], Formula.prototype, "formulaNo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], Formula.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Formula.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamptz' }),
    __metadata("design:type", Date)
], Formula.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', type: 'timestamptz' }),
    __metadata("design:type", Date)
], Formula.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => formulaComposition_model_1.FormulaComposition, (composition) => composition.formula, {
        cascade: true,
    }),
    __metadata("design:type", Array)
], Formula.prototype, "compositions", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => formulaEnergy_model_1.FormulaEnergy, (energy) => energy.formula, { cascade: true }),
    __metadata("design:type", Array)
], Formula.prototype, "energies", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => formulaNutrition_model_1.FormulaNutrition, (nutrition) => nutrition.formula, {
        cascade: true,
    }),
    __metadata("design:type", Array)
], Formula.prototype, "nutritions", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => formulaAdditional_model_1.FormulaAdditional, (additional) => additional.formula, {
        cascade: true,
    }),
    __metadata("design:type", Array)
], Formula.prototype, "additionals", void 0);
Formula = __decorate([
    (0, typeorm_1.Entity)({ schema: 'formulas', name: 'formula' })
], Formula);
exports.Formula = Formula;
