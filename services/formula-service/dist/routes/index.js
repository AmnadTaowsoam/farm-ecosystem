"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// services/formula-service/src/routes/index.ts
const express_1 = require("express");
const formula_route_1 = __importDefault(require("./formula.route"));
const formulaComposition_route_1 = __importDefault(require("./formulaComposition.route"));
const formulaEnergy_route_1 = __importDefault(require("./formulaEnergy.route"));
const formulaNutrition_route_1 = __importDefault(require("./formulaNutrition.route"));
const formulaAdditional_route_1 = __importDefault(require("./formulaAdditional.route"));
const router = (0, express_1.Router)();
router.use('/formulas', formula_route_1.default);
router.use('/formula-compositions', formulaComposition_route_1.default);
router.use('/formula-energies', formulaEnergy_route_1.default);
router.use('/formula-nutritions', formulaNutrition_route_1.default);
router.use('/formula-additionals', formulaAdditional_route_1.default);
exports.default = router;
