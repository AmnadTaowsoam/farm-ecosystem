# Smart Farming AIoT

**Smart Farming AIoT** คือแพลตฟอร์มฟาร์มอัจฉริยะที่รวม IoT, AI, Edge, และ Cloud Microservices เพื่อจัดการฟาร์มยุคใหม่อย่างมีประสิทธิภาพ รองรับตั้งแต่การเชื่อมต่อเซนเซอร์บน Edge ไปจนถึงการวิเคราะห์และแสดงผลผ่าน Dashboard บน Cloud

---

## Project Structure

```plaintext
smart-farming-aiot/
├── backend/services/       # Microservices ฝั่ง server (ดูรายละเอียดแต่ละ service ด้านล่าง)
├── frontend/               # React Web Dashboard + Mobile App (optional)
├── infra/                  # Infra-as-Code: Docker, K8s, Terraform
├── docs/                   # เอกสาร: สถาปัตยกรรม, API, คู่มือ, วิธีติดตั้ง
├── tests/                  # Automated Tests (Unit/Integration/E2E)
├── db/                     # Database Schema & Migrations
├── .gitignore
├── README.md               # (ไฟล์นี้)
├── package.json
├── yarn.lock / package-lock.json
└── LICENSE
````

#### Key Backend Services

* `auth-service`           : ระบบผู้ใช้และการยืนยันตัวตน (JWT)
* `mqtt-client`            : ส่งข้อมูล sensor จาก Edge device (Jetson, Raspberry Pi)
* `edge-server`            : Node-RED, API, และฐานข้อมูลขอบ (Edge DB)
* `sync-service`           : ส่งข้อมูลจาก Edge ขึ้น Cloud
* `cloud-api`              : REST API หลัก (CRUD ฟาร์ม, สัตว์, ฯลฯ)
* `dashboard-service`      : บริการคำนวณ/ดึงข้อมูล KPI & User Config
* `data-service`           : Data Aggregation & Read API (optional)
* `monitoring-service`     : จัดการ Alert และกฎ
* `analytics-service`      : ฟีเจอร์ AI และผลลัพธ์โมเดล

---

## Quick Start

### 1. เตรียม Infra (Dev)

* ติดตั้ง [Docker](https://docs.docker.com/get-docker/)

* สั่งรันทั้งหมด (dev):

  ```bash
  cd infra/docker
  docker-compose up
  ```

* หรือใช้ Kubernetes manifests ใน `infra/k8s/` (สำหรับ production)

### 2. Frontend

* Dashboard (React):

  ```bash
  cd frontend/dashboard
  npm install
  npm start
  # เปิดที่ http://localhost:3000/
  ```

* Mobile App (React Native):

  ```bash
  cd frontend/mobile-app
  npm install
  npm run android # หรือ npm run ios
  ```

### 3. Backend Services

* ดู README.md ในแต่ละ service (`backend/services/<service>/README.md`)
* ทดสอบ service:

  ```bash
  npm test --prefix backend/services/<service>
  ```

### 4. Database

* สร้าง schema เริ่มต้นจากไฟล์ใน `db/database.sql`

---

## Documentation

* **System Design:**         `docs/architecture.md`
* **API Reference:**         `docs/api-spec.md`
* **User Manual:**           `docs/user-manual.md`
* **Setup & Deployment:**    `docs/setup-guide.md`

---

## Contribution

* Fork repo, สร้าง branch ใหม่, pull request
* อ่าน guideline เพิ่มใน `docs/CONTRIBUTING.md` (ถ้ามี)

---

## License

This project is licensed under the terms of the [MIT License](./LICENSE).

---

**Smart Farming AIoT — Bring the Future of Farming to Your Fields**

```

### หมายเหตุ
- ถ้าโปรเจกต์ของคุณใช้ monorepo ของ node.js จริงๆ ใส่คำอธิบาย npm/yarn ที่ root ด้วย
- ถ้าต้องการเน้น Production/DevOps หรือ Security Policy เพิ่มเติม สามารถแทรก section เพิ่มได้
- README ควร “short & to the point” สำหรับภาพรวม ใครเข้ามาครั้งแรกจะได้เข้าใจโครงสร้าง, entrypoint และจะไปต่อยังไง

```
