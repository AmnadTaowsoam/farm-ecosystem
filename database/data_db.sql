-- create_schema_and_all_tables.sql

-- 0. สร้าง Schema สำหรับระบบ
CREATE SCHEMA IF NOT EXISTS smart_farming AUTHORIZATION postgres;

-------------------------------------------------------------
-- 1. ติดตั้ง TimescaleDB extension (ใน database ปัจจุบัน)
CREATE EXTENSION IF NOT EXISTS timescaledb;

-------------------------------------------------------------
-- 2. สร้างตารางหลักในลำดับที่ถูกต้อง

-- 2.1 ลูกค้า
CREATE TABLE IF NOT EXISTS smart_farming.customers (
    customer_id    SERIAL PRIMARY KEY,
    name           VARCHAR(255) NOT NULL,
    email          VARCHAR(255),
    phone          VARCHAR(50),
    address        TEXT,
    billing_info   JSONB,
    created_at     TIMESTAMPTZ DEFAULT NOW()
);

-- 2.2 Subscription ของลูกค้า
CREATE TABLE IF NOT EXISTS smart_farming.subscriptions (
    subscription_id SERIAL PRIMARY KEY,
    customer_id     INTEGER REFERENCES smart_farming.customers(customer_id) ON DELETE CASCADE,
    plan_type       VARCHAR(100),
    start_date      DATE,
    end_date        DATE,
    status          VARCHAR(50) DEFAULT 'active',
    created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- 2.3 ฟาร์ม
CREATE TABLE IF NOT EXISTS smart_farming.farms (
    farm_id     SERIAL PRIMARY KEY,
    customer_id INTEGER REFERENCES smart_farming.customers(customer_id) ON DELETE CASCADE,
    name        VARCHAR(255) NOT NULL,
    location    TEXT,
    status      VARCHAR(50) DEFAULT 'active',
    created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- 2.4 เล้า (houses)
CREATE TABLE IF NOT EXISTS smart_farming.houses (
    house_id    SERIAL PRIMARY KEY,
    farm_id     INTEGER REFERENCES smart_farming.farms(farm_id) ON DELETE CASCADE,
    name        VARCHAR(100),
    area        NUMERIC,
    capacity    INTEGER,
    created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- 2.5 อุปกรณ์ (devices)
CREATE TABLE IF NOT EXISTS smart_farming.devices (
    device_id        SERIAL PRIMARY KEY,
    house_id         INTEGER REFERENCES smart_farming.houses(house_id) ON DELETE CASCADE,
    type             VARCHAR(100),
    model            VARCHAR(100),
    serial_number    VARCHAR(100),
    install_date     DATE,
    calibration_date DATE,
    last_maintenance DATE,
    location_detail  TEXT,
    status           VARCHAR(50) DEFAULT 'active',
    created_at       TIMESTAMPTZ DEFAULT NOW()
);

-- 2.6 สัตว์ (animals)
CREATE TABLE IF NOT EXISTS smart_farming.animals (
    animal_id   SERIAL PRIMARY KEY,
    farm_id     INTEGER NOT NULL REFERENCES smart_farming.farms(farm_id) ON DELETE CASCADE,
    house_id    INTEGER REFERENCES smart_farming.houses(house_id) ON DELETE SET NULL,
    species     VARCHAR(50),
    breed       VARCHAR(50),
    birth_date  DATE,
    created_at  TIMESTAMPTZ DEFAULT NOW(),
    updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Trigger & Function สำหรับอัปเดต updated_at
CREATE OR REPLACE FUNCTION smart_farming.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_animals_updated_at ON smart_farming.animals;
CREATE TRIGGER update_animals_updated_at
BEFORE UPDATE ON smart_farming.animals
FOR EACH ROW EXECUTE PROCEDURE smart_farming.update_updated_at_column();

-- 2.7 Genetic Factors
CREATE TABLE IF NOT EXISTS smart_farming.genetic_factors (
    id         SERIAL PRIMARY KEY,
    animal_id  INTEGER NOT NULL REFERENCES smart_farming.animals(animal_id) ON DELETE CASCADE,
    test_type  VARCHAR(100),
    result     TEXT,
    test_date  DATE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2.8 Feeding Programs
CREATE TABLE IF NOT EXISTS smart_farming.feed_programs (
    id              SERIAL PRIMARY KEY,
    farm_id         INTEGER NOT NULL REFERENCES smart_farming.farms(farm_id) ON DELETE CASCADE,
    name            VARCHAR(100),
    description     TEXT,
    effective_start TIMESTAMPTZ NOT NULL,
    effective_end   TIMESTAMPTZ,
    created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- 2.9 Feed Intake
CREATE TABLE IF NOT EXISTS smart_farming.feed_intake (
    id            SERIAL PRIMARY KEY,
    farm_id       INTEGER NOT NULL REFERENCES smart_farming.farms(farm_id) ON DELETE CASCADE,
    animal_id     INTEGER REFERENCES smart_farming.animals(animal_id) ON DELETE SET NULL,
    feed_quantity NUMERIC,
    created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- 2.10 Feed Composition
CREATE TABLE IF NOT EXISTS smart_farming.feed_composition (
    id               SERIAL PRIMARY KEY,
    farm_id          INTEGER NOT NULL REFERENCES smart_farming.farms(farm_id) ON DELETE CASCADE,
    feed_no          VARCHAR(13),
    feed_composition VARCHAR(100),
    effective_start  TIMESTAMPTZ NOT NULL,
    effective_end    TIMESTAMPTZ,
    created_at       TIMESTAMPTZ DEFAULT NOW()
);

-- 2.11 Feed Analysis
CREATE TABLE IF NOT EXISTS smart_farming.feed_analysis (
    id         SERIAL PRIMARY KEY,
    program_id INTEGER NOT NULL REFERENCES smart_farming.feed_programs(id) ON DELETE CASCADE,
    component  VARCHAR(100),
    value      NUMERIC,
    unit       VARCHAR(20),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2.12 Feed Quality
CREATE TABLE IF NOT EXISTS smart_farming.feed_quality (
    id              SERIAL PRIMARY KEY,
    program_id      INTEGER NOT NULL REFERENCES smart_farming.feed_programs(id) ON DELETE CASCADE,
    moisture        NUMERIC,
    protein         NUMERIC,
    fat             NUMERIC,
    fiber           NUMERIC,
    ash             NUMERIC,
    ge_energy       NUMERIC,
    de_energy       NUMERIC,
    me_energy       NUMERIC,
    ne_energy       NUMERIC,
    ph              NUMERIC,
    mineral         NUMERIC,
    effective_start TIMESTAMPTZ NOT NULL,
    effective_end   TIMESTAMPTZ,
    created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- 2.13 Environmental Factors
CREATE TABLE IF NOT EXISTS smart_farming.environmental_factors (
    id               SERIAL PRIMARY KEY,
    farm_id          INTEGER NOT NULL REFERENCES smart_farming.farms(farm_id) ON DELETE CASCADE,
    ventilation_rate NUMERIC,
    note             TEXT,
    measurement_date DATE,
    effective_start  TIMESTAMPTZ NOT NULL,
    effective_end    TIMESTAMPTZ,
    created_at       TIMESTAMPTZ DEFAULT NOW()
);

-- 2.14 Housing Conditions
CREATE TABLE IF NOT EXISTS smart_farming.housing_conditions (
    id               SERIAL PRIMARY KEY,
    farm_id          INTEGER NOT NULL REFERENCES smart_farming.farms(farm_id) ON DELETE CASCADE,
    flooring_humidity NUMERIC,
    animal_density    INTEGER,
    area              NUMERIC,
    effective_start   TIMESTAMPTZ NOT NULL,
    effective_end     TIMESTAMPTZ,
    created_at        TIMESTAMPTZ DEFAULT NOW()
);

-- 2.15 Water Quality
CREATE TABLE IF NOT EXISTS smart_farming.water_quality (
    id              SERIAL PRIMARY KEY,
    farm_id         INTEGER NOT NULL REFERENCES smart_farming.farms(farm_id) ON DELETE CASCADE,
    fe              NUMERIC,
    pb              NUMERIC,
    note            TEXT,
    measurement_date DATE,
    created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- 2.16 Health Records
CREATE TABLE IF NOT EXISTS smart_farming.health_records (
    id           SERIAL PRIMARY KEY,
    animal_id    INTEGER NOT NULL REFERENCES smart_farming.animals(animal_id) ON DELETE CASCADE,
    health_status TEXT,
    disease      VARCHAR(100),
    vaccine      TEXT,
    recorded_date DATE,
    created_at   TIMESTAMPTZ DEFAULT NOW()
);

-- 2.17 Welfare Indicators
CREATE TABLE IF NOT EXISTS smart_farming.welfare_indicators (
    id              SERIAL PRIMARY KEY,
    animal_id       INTEGER NOT NULL REFERENCES smart_farming.animals(animal_id) ON DELETE CASCADE,
    footpad_lesion  BOOLEAN,
    stress_hormone  NUMERIC,
    recorded_date   DATE,
    created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- 2.18 Performance Metrics (Partitioned by year)
CREATE TABLE IF NOT EXISTS smart_farming.performance_metrics (
    id                      BIGSERIAL NOT NULL,
    animal_id               INTEGER NOT NULL REFERENCES smart_farming.animals(animal_id) ON DELETE CASCADE,
    adg                     NUMERIC,
    fcr                     NUMERIC,
    survival_rate           NUMERIC,
    pi_score                NUMERIC,
    mortality_rate          NUMERIC,
    health_score            NUMERIC,
    behavior_score          NUMERIC,
    body_condition_score    NUMERIC,
    stress_level            NUMERIC,
    disease_incidence_rate  NUMERIC,
    vaccination_status      VARCHAR(50),
    recorded_date           DATE       NOT NULL,
    created_at              TIMESTAMPTZ DEFAULT NOW(),
    updated_at              TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (id, recorded_date)
) PARTITION BY RANGE (recorded_date);

CREATE TABLE IF NOT EXISTS smart_farming.performance_metrics_2024 PARTITION OF smart_farming.performance_metrics
    FOR VALUES FROM ('2024-01-01') TO ('2025-01-01');

CREATE TABLE IF NOT EXISTS smart_farming.performance_metrics_2025 PARTITION OF smart_farming.performance_metrics
    FOR VALUES FROM ('2025-01-01') TO ('2026-01-01');

-- 2.19 Operational Records
CREATE TABLE IF NOT EXISTS smart_farming.operational_records (
    id           SERIAL PRIMARY KEY,
    farm_id      INTEGER NOT NULL REFERENCES smart_farming.farms(farm_id) ON DELETE CASCADE,
    type         VARCHAR(100),
    description  TEXT,
    record_date  DATE,
    created_at   TIMESTAMPTZ DEFAULT NOW()
);

-- 2.20 Economic Data
CREATE TABLE IF NOT EXISTS smart_farming.economic_data (
    id              SERIAL PRIMARY KEY,
    farm_id         INTEGER NOT NULL REFERENCES smart_farming.farms(farm_id) ON DELETE CASCADE,
    cost_type       VARCHAR(100),
    amount          NUMERIC,
    animal_price    NUMERIC,
    feed_cost       NUMERIC,
    labor_cost      NUMERIC,
    utility_cost    NUMERIC,
    medication_cost NUMERIC,
    maintenance_cost NUMERIC,
    other_costs     NUMERIC,
    record_date     DATE,
    created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- 2.21 External Factors
CREATE TABLE IF NOT EXISTS smart_farming.external_factors (
    id                  SERIAL PRIMARY KEY,
    farm_id             INTEGER NOT NULL REFERENCES smart_farming.farms(farm_id) ON DELETE CASCADE,
    weather             JSONB,
    disease_alert       JSONB,
    market_price        JSONB,
    feed_supply         JSONB,
    weather_forecast    JSONB,
    disease_risk_score  NUMERIC,
    regulatory_changes  TEXT,
    record_date         DATE,
    created_at          TIMESTAMPTZ DEFAULT NOW()
);

-------------------------------------------------------------
-- 3. สร้าง Hypertable และ Indexes

-------------------------------------------------------------
-- 2. สร้างตาราง sensor_data ใน schema smart_farming
CREATE TABLE IF NOT EXISTS smart_farming.sensor_data (
    time         TIMESTAMPTZ       NOT NULL,
    device_id    INTEGER           NOT NULL 
                      REFERENCES smart_farming.devices(device_id) 
                      ON DELETE CASCADE,
    topic        TEXT              NOT NULL,
    value        DOUBLE PRECISION  NOT NULL,
    raw_payload  JSONB,
    PRIMARY KEY (time, device_id, topic)
);

-- แปลงตารางให้เป็น Hypertable (ระบุ schema.table)
SELECT create_hypertable(
    'smart_farming.sensor_data',   -- ชื่อ schema.table
    'time',                         -- ชื่อคอลัมน์เวลาที่จะ partition
    chunk_time_interval => INTERVAL '1 day',  -- กำหนดขนาด chunk
    if_not_exists => TRUE,
    migrate_data   => TRUE
);

-- (Optional) Index เสริม
CREATE INDEX IF NOT EXISTS idx_sensor_data_device_time
    ON smart_farming.sensor_data (device_id, time DESC);

CREATE INDEX IF NOT EXISTS idx_sensor_data_topic_time
    ON smart_farming.sensor_data (topic, time DESC);

-------------------------------------------------------------

-- Example additional indexes on other tables:
CREATE INDEX IF NOT EXISTS idx_animals_farm_id 
    ON smart_farming.animals(farm_id);
CREATE INDEX IF NOT EXISTS idx_devices_house_id 
    ON smart_farming.devices(house_id);
CREATE INDEX IF NOT EXISTS idx_feed_analysis_program_id 
    ON smart_farming.feed_analysis(program_id);
CREATE INDEX IF NOT EXISTS idx_performance_metrics_animal_id 
    ON smart_farming.performance_metrics(animal_id);
CREATE INDEX IF NOT EXISTS idx_performance_metrics_recorded_date 
    ON smart_farming.performance_metrics(recorded_date);

-- GIN indexes for JSONB fields:
CREATE INDEX IF NOT EXISTS idx_external_factors_weather_gin 
    ON smart_farming.external_factors USING gin (weather);
CREATE INDEX IF NOT EXISTS idx_external_factors_disease_alert_gin 
    ON smart_farming.external_factors USING gin (disease_alert);