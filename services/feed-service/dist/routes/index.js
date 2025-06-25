"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRoutes = void 0;
// src/routes/index.ts
const express_1 = require("express");
const feedBatches_route_1 = require("./feedBatches.route");
const physicalQuality_route_1 = require("./physicalQuality.route");
const chemicalQuality_route_1 = require("./chemicalQuality.route");
const pelletMillCondition_route_1 = require("./pelletMillCondition.route");
const mixingCondition_route_1 = require("./mixingCondition.route");
const grindingCondition_route_1 = require("./grindingCondition.route");
const feedBatchAssignments_route_1 = require("./feedBatchAssignments.route");
function createRoutes(dataSource) {
    const router = (0, express_1.Router)();
    router.use('/feed-batches', (0, feedBatches_route_1.feedBatchesRouter)(dataSource));
    router.use('/physical-quality', (0, physicalQuality_route_1.physicalQualityRouter)(dataSource));
    router.use('/chemical-quality', (0, chemicalQuality_route_1.chemicalQualityRouter)(dataSource));
    router.use('/pellet-mill-condition', (0, pelletMillCondition_route_1.pelletMillConditionRouter)(dataSource));
    router.use('/mixing-condition', (0, mixingCondition_route_1.mixingConditionRouter)(dataSource));
    router.use('/grinding-condition', (0, grindingCondition_route_1.grindingConditionRouter)(dataSource));
    router.use('/feed-batch-assignments', (0, feedBatchAssignments_route_1.feedBatchAssignmentsRouter)(dataSource));
    return router;
}
exports.createRoutes = createRoutes;
// เพิ่มบรรทัดนี้ เพื่อ export default
exports.default = createRoutes;
