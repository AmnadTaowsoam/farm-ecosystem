"use strict";
// services/economic-service/src/routes/index.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const economicData_route_1 = __importDefault(require("./economicData.route"));
const router = (0, express_1.Router)();
router.use('/economic-data', economicData_route_1.default);
exports.default = router;
