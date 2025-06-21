# Smart Farming AIoT Project

## Overview

โปรเจกต์ **smart-farming-aiot** เป็นระบบบริหารจัดการฟาร์มอัจฉริยะ ที่ผสมผสานเทคโนโลยี **IoT**, **AI**, และ **Microservices** เพื่อ:

* เก็บข้อมูลจาก Sensor แบบเรียลไทม์
* ประมวลผลและวิเคราะห์ข้อมูลเบื้องต้นบน Edge Devices
* ซิงค์ข้อมูลขึ้น Cloud สำหรับการจัดเก็บถาวรและวิเคราะห์เชิงลึก
* แสดงผลผ่าน Web Dashboard และ Mobile App

ด้วยสถาปัตยกรรมที่ยืดหยุ่น ขยายตัวได้ง่าย รองรับการทำงานทั้งบน Edge และ Cloud

---

## Project Structure

```plaintext
smart-farming-aiot/
├── backend/services/       # Microservices ฝั่ง server
│   ├── auth-service/       # 4100-Authentication & Authorization
│   ├── sensor-service      # 4101-MQTT Broker to time-series database
│   ├── mqtt-client/        # 4102-MQTT Publisher บน Edge Devices
│   ├── edge-server/        # 4103-Node-RED, API & Edge DB
│   ├── sync-service/       # 4104-Sync ข้อมูลจาก Edge → Cloud
│   ├── cloud-api/          # 4105-Core Business API (Smart Farming CRUD)
│   ├── dashboard-service/  # 4105-KPI Summary & User Config
│   ├── data-service/       # 4107-Data Aggregation & Read APIs
│   ├── monitoring-service/ # 4108-Alert Management
│   ├── analytics-service/  # 4109-Feature Store & Model Results
│   └── shared/             # Libraries & Utilities
├── frontend/               # Frontend Client
│   ├── dashboard/          # React Web Dashboard
│   ├── mobile-app/         # React Native Mobile App (optional)
│   ├── device-mang-app/    # 4110 React Native Web Application
│   └── README.md           # Frontend Setup & Usage
├── infra/                  # Infrastructure as Code & Deployment
│   ├── docker/             # Dockerfiles & docker-compose
│   ├── k8s/                # Kubernetes Manifests
│   └── terraform/          # Terraform Scripts
├── docs/                   # Documentation
│   ├── architecture.md     # System Architecture
│   ├── api-spec.md         # API Specification
│   ├── user-manual.md      # User Manual
│   ├── setup-guide.md      # Setup & Deployment Guide
│   └── README.md           # Docs Overview
├── tests/                  # Automated Tests
│   ├── backend/            # Unit & Integration Tests
│   ├── frontend/           # Frontend Tests
│   └── e2e/                # End-to-End Tests
├── db/                     # Database Schema
│   └── database.sql        # Initial Schema & Migrations
├── .gitignore
├── README.md               # This File
├── package.json            # Monorepo Dependencies (if Node.js)
├── yarn.lock / package-lock.json
└── LICENSE                 # License (e.g., MIT, Apache 2.0)
```

---

## Database Design

ฐานข้อมูลจัดเก็บใน **PostgreSQL** แยกเป็นหลาย Schema ตามหน้าที่:

* `smart_farming`: ข้อมูลฟาร์ม, สัตว์, Sensor, Feed, Health, Metrics
* `auth`: ผู้ใช้งาน, หมดอายุและรีเฟรชโทเค็น
* `dashboard`: Cache KPI และการตั้งค่า Widget
* `monitoring`: Alerts และ Alert Rules
* `analytics`: Feature Store และ Model Results

ตารางหลัก (customers, farms, houses, animals, devices) ออกแบบรองรับระบบ production และ time-series partitioning

---

## API Design Summary

### 1. Auth-Service

* **POST** `/auth/register`: ลงทะเบียน
* **POST** `/auth/login`: เข้าสู่ระบบ
* **POST** `/auth/refresh-token`: รีเฟรชโทเค็น
* **POST** `/auth/logout`: ออกจากระบบ

### 2. Cloud-API (Smart Farming CRUD)

| Method | Path              | Description      |
| ------ | ----------------- | ---------------- |
| GET    | `/customers`      | ดึงลูกค้าทั้งหมด |
| POST   | `/customers`      | สร้างลูกค้าใหม่  |
| GET    | `/customers/{id}` | รายละเอียดลูกค้า |
| PUT    | `/customers/{id}` | แก้ไขลูกค้า      |
| DELETE | `/customers/{id}` | ลบลูกค้า         |

(และ endpoints สำหรับ `/farms`, `/houses`, `/animals`, `/devices`)

### 3. Dashboard-Service

* **GET** `/dashboard/{user_id}/config`
* **POST** `/dashboard/{user_id}/config`
* **GET** `/dashboard/{farm_id}/metrics`

### 4. Monitoring-Service

* **GET** `/alerts`
* **POST** `/alerts`
* **PUT** `/alerts/{id}/resolve`
* **GET** `/alert_rules`
* **POST** `/alert_rules`
* **PUT** `/alert_rules/{id}`

### 5. Analytics-Service

* **GET** `/features`
* **POST** `/features`
* **GET** `/model_results`
* **POST** `/model_results`

### 6. Sync-Service

* **POST** `/sync/edge-to-cloud`

---

## Authentication & Security

* ใช้ **JWT Bearer Token** สําหรับ API ทุกรายการ (ยกเว้น register/login)
* Header: `Authorization: Bearer <access_token>`

---

## Development & Deployment

* แต่ละ microservice แพ็กด้วย **Docker**
* พัฒนาและทดสอบด้วย **docker-compose** (dev)
* Deploy production ด้วย **Kubernetes** หรือ **Terraform + EKS/GKE**
* **Edge**: รัน mqtt-client และ edge-server บน Jetson/RPi พร้อม Node-RED flows

---

## Documentation & Tests

* ดูเอกสารสมบูรณ์ในโฟลเดอร์ `/docs`
* รัน tests:

  ```bash
  # Backend
  npm test --prefix backend/services/<service>

  # Frontend
  npm test --prefix frontend/dashboard

  # E2E
  npm run test:e2e
  ```

---

## Contact & Support

* ดูคู่มือผู้ใช้: `/docs/user-manual.md`
* ดูวิธีติดตั้ง: `/docs/setup-guide.md`
* ติดต่อทีมพัฒนาที่ `support@yourdomain.com`

---

**Smart Farming AIoT** — ยกระดับการจัดการฟาร์มด้วย IoT และ AI
