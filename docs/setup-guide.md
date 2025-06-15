# Setup Guide: Smart Farming AIoT

This guide explains how to set up the Smart Farming AIoT platform from development to production, covering prerequisites, infrastructure, environment configuration, and deployment steps.

---

## 1. Prerequisites

### Hardware

* **Edge Devices**: NVIDIA Jetson or Raspberry Pi
* **Sensors/Actuators**: Scales, Cameras, Temperature/Humidity/CO₂ sensors, etc.
* **Server**: Cloud VM or on-prem server for Kubernetes/Docker host

### Software

* **Operating System**: Ubuntu 20.04 LTS or later
* **Docker & Docker Compose**: v20.10+
* **Kubernetes** (optional): v1.21+ (for production)
* **Terraform** (optional): v1.0+ (for infrastructure as code)
* **Node.js**: v14+ (for services)
* **Python**: v3.8+ (for analytics)
* **MQTT Broker**: Mosquitto or EMQX
* **PostgreSQL**: v13+ (cloud or self-hosted)
* **InfluxDB** (optional): for time-series data analytics

---

## 2. Repository Structure

```plaintext
smart-farming-aiot/
├── backend/services/
├── frontend/dashboard/
├── infra/docker/
├── infra/k8s/
├── infra/terraform/
├── docs/
└── db/database.sql
```

---

## 3. Environment Configuration

### Environment Variables

Create a `.env` file at project root or in each service directory with keys:

```ini
# Common
NODE_ENV=development
PORT=3000
JWT_SECRET=your_jwt_secret
DATABASE_URL=postgres://user:pass@host:5432/smart_farming
MQTT_BROKER_URL=mqtt://broker_host:1883

# Edge Server
EDGE_DB_PATH=/data/edge.db

# Analytics
FEATURE_STORE_DB_URL=postgres://user:pass@host:5432/analytics

# Terraform
AWS_REGION=ap-southeast-1
```

---

## 4. Database Setup

1. **Install PostgreSQL**

   ```bash
   sudo apt update
   sudo apt install postgresql postgresql-contrib
   ```
2. **Create Database & User**

   ```sql
   sudo -u postgres psql
   CREATE DATABASE smart_farming;
   CREATE USER sf_user WITH PASSWORD 'sf_password';
   GRANT ALL PRIVILEGES ON DATABASE smart_farming TO sf_user;
   \q
   ```
3. **Run Schema Migration**

   ```bash
   psql postgresql://sf_user:sf_password@localhost:5432/smart_farming < db/database.sql
   ```

---

## 5. Docker Compose (Development)

1. **Navigate to infra/docker/**

   ```bash
   cd infra/docker
   ```
2. **Start all services**

   ```bash
   docker-compose up -d
   ```
3. **Verify**

   * `docker ps` shows containers for auth, cloud-api, dashboard, monitoring, analytics, sync, mqtt, postgres.
   * Access [http://localhost:3000/api/v1/health](http://localhost:3000/api/v1/health) or Swagger UI.

---

## 6. Kubernetes (Production)

1. **Configure `infra/k8s/`**

   * Edit Deployment YAML for each service (replicas, resource limits)
   * Configure Secrets for DB credentials, JWT\_SECRET
2. **Apply Manifests**

   ```bash
   kubectl apply -f infra/k8s/
   ```
3. **Ingress & SSL**

   * Configure Ingress controller (e.g., Nginx) and TLS certificates (Let’s Encrypt)

---

## 7. Terraform (Cloud Infrastructure)

1. **Navigate to infra/terraform/**

   ```bash
   cd infra/terraform
   ```
2. **Initialize & Plan**

   ```bash
   terraform init
   terraform plan
   ```
3. **Apply**

   ```bash
   terraform apply
   ```

   * Provisions VPC, subnets, RDS (PostgreSQL), EKS/GKE cluster, IAM Roles

---

## 8. Edge Deployment

1. **Install Docker on Jetson/RPi**
2. **Configure `.env` for Edge**
3. **Deploy MQTT Client**

   ```bash
   cd backend/services/mqtt-client
   docker build -t mqtt-client:latest .
   docker run -d --env-file .env mqtt-client:latest
   ```
4. **Deploy Edge Server** (Node-RED + Sync Service)

   ```bash
   cd backend/services/edge-server
   docker build -t edge-server:latest .
   docker run -d --env-file .env edge-server:latest
   ```

---

## 9. Verification & Health Checks

* **Health Endpoints**: Each service exposes `/health` returning 200 OK
* **Logs**: Use `docker logs` or `kubectl logs` to debug
* **MQTT**: Use `mosquitto_sub` to subscribe to topics and verify sensor data
* **Database**: Connect via `psql` or PgAdmin and verify tables & data

---

## 10. Next Steps

* Configure CI/CD pipelines (e.g., GitHub Actions) for automated build & deployment
* Set up monitoring (Prometheus, Grafana) for service metrics
* Implement backups for databases by schedule

---

*End of Setup Guide*
