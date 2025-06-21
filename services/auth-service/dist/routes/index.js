"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// services/auth-service/src/routes/index.ts
const express_1 = require("express");
const authRoutes_1 = require("./authRoutes");
const router = (0, express_1.Router)();
router.use('/api/v1/auth', authRoutes_1.createAuthRouter);
exports.default = router;
