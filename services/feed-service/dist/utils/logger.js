"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logRequest = void 0;
// src/utils/logger.ts
function logRequest(method, url) {
    console.log(`[${new Date().toISOString()}] ${method} ${url}`);
}
exports.logRequest = logRequest;
