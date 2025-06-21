"use strict";
// services\sensor-service\src\utils\helpers.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.parsePayload = parsePayload;
function parsePayload(payload) {
    try {
        return JSON.parse(payload.toString());
    }
    catch (err) {
        console.warn("Failed to parse MQTT payload:", err);
        return null;
    }
}
