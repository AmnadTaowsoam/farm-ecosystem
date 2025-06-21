"use strict";
// services\sensor-service\src\routes\sensorRoutes.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSensorData = updateSensorData;
const express_1 = require("express");
const router = (0, express_1.Router)();
// เก็บข้อมูล sensor ล่าสุดไว้ในหน่วยความจำ (ตัวอย่างง่ายๆ)
let latestSensorData = [];
// API ดึงข้อมูล sensor ล่าสุด
router.get("/latest", (req, res) => {
    res.json({ data: latestSensorData });
});
function updateSensorData(newData) {
    // อัปเดตข้อมูล sensor ล่าสุด (เก็บแค่ 10 รายการล่าสุด)
    latestSensorData.unshift(newData);
    if (latestSensorData.length > 10) {
        latestSensorData.pop();
    }
}
exports.default = router;
