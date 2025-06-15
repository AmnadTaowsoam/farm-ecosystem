# System Architecture: Smart Farming AIoT

**This document outlines the end-to-end architecture and data flow of the Smart Farming AIoT platform, from sensor edge to cloud microservices.**

---

## 1. Overview

The Smart Farming AIoT system consists of three main layers:

1. **Edge Layer**

   * **IoT Devices**: Sensors (temperature, humidity, CO₂, NH₃, light), cameras, scales measure farm data.
   * **Connectivity**: Devices publish via **MQTT** to local broker.

2. **Edge Server**

   * **MQTT Broker**: Receives all device messages.
   * **Node-RED**: Subscribes, transforms, and routes messages.
   * **Local DB**: Temporary buffer (SQLite or TimescaleDB) for time-series data.
   * **Sync-Service**: Batches buffered data and securely sends to cloud API.

3. **Cloud Layer**
   A microservices architecture deployed on Kubernetes (or Docker Compose):

   | Service                | Responsibility                                            | Database Schema     |
   | ---------------------- | --------------------------------------------------------- | ------------------- |
   | **Auth-Service**       | User registration, login, JWT issuance, token revocation  | `auth`              |
   | **Cloud-API**          | Core CRUD for customers, farms, houses, animals, devices  | `smart_farming`     |
   | **Dashboard-Service**  | KPI aggregation, widget configuration                     | `dashboard`         |
   | **Monitoring-Service** | Alert evaluation, rules engine, notifications             | `monitoring`        |
   | **Analytics-Service**  | Feature store, AI model training & inference              | `analytics`         |
   | **Sync-Service**       | Data ingestion endpoint for edge-to-cloud synchronization | (uses cloud-api DB) |

   All services expose REST (and optional WebSocket) APIs behind an **API Gateway** for routing, authentication, and rate limiting.

The **Cloud DB** is a PostgreSQL cluster with logical separation per schema.

---

## 2. Component Diagram

```plaintext
[Sensor/Actuator] -(MQTT)-> [Jetson/RPi] -(Wi-Fi/Ethernet)-> [Edge Server]
      Edge Server: { MQTT Broker | Node-RED | Local DB | Sync-Service }
                         |
                         | (HTTPS)
                         v
                  [API Gateway]
                         |
       +-----------------+-----------------
       |                 |                 |
 [Auth] / [Cloud-API] [Dashboard] [Monitoring] [Analytics]
       
          \              |                /
           \             |               /
            \            |              /
             +------[Postgres Cluster]------+
```

---

## 3. Data Flow

1. **Sensor → Edge Broker**: Sensor data published to local MQTT topics.
2. **Edge Processing**: Node-RED flows subscribe, filter noisy readings, add metadata.
3. **Edge Buffer**: Pre-processed messages inserted into local timeseries DB.
4. **Edge → Cloud Sync**: Sync-Service polls buffer (e.g., every 1–5 min), calls `POST /sync/edge-to-cloud`.
5. **Cloud Persistence**: Cloud-API validates and writes data into production tables (partitioned by date).
6. **Real-Time Analytics**: Monitoring-Service triggers alerts; Analytics-Service computes new features/predictions.
7. **Dashboard Update**: Dashboard-Service fetches aggregated metrics and serves to frontend.

---

## 4. Microservice Interactions

| From               | To                  | Endpoint                              | Protocol  |
| ------------------ | ------------------- | ------------------------------------- | --------- |
| Edge Sync-Service  | Cloud-API           | `POST /sync/edge-to-cloud`            | HTTPS     |
| Frontend Dashboard | Dashboard-Service   | `GET /dashboard/{farm}/metrics`       | HTTP      |
| Auth-Service       | All Secure Services | JWT Bearer via `Authorization` header | HTTP      |
| Data-Service       | Cloud-API DB        | Direct DB connections                 | TCP       |
| Monitoring-Service | Notification System | (e.g., Email/SMS/Webhook)             | HTTP/Push |

---

## 5. Deployment

* **Edge**: Run `mqtt-client` and `edge-server` in Docker on Jetson/RPi.
* **Cloud**: Deploy all services on Kubernetes (EKS/GKE/AKS) with Helm charts or Docker Compose for smaller setups.
* **Infrastructure as Code**: Use Terraform to provision VPC, subnets, RDS, EKS cluster, and managed MQTT broker if needed.

---

## 6. Security Considerations

* **Authentication**: JWT tokens issued by Auth-Service; services validate tokens for protected endpoints.
* **Network Isolation**: Edge network segmented from public internet; only Edge Server communicates outbound.
* **Encryption**: TLS for MQTT, HTTPS for API calls, and SSL for DB connections.
* **Least Privilege**: DB users scoped per schema; services run with minimal OS privileges.

---

*Reviewed on: 2025-06-15*
*Maintainer: Platform Architecture Team*
