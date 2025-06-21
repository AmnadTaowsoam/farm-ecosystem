"use strict";
// services\sensor-service\src\middlewares\logger.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = logger;
function logger(req, res, next) {
    console.log(`${req.method} ${req.url}`);
    next();
}
