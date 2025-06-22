CREATE SCHEMA IF NOT EXISTS farms;

-- ตาราง farms
CREATE TABLE farms.farms (
    farm_id SERIAL PRIMARY KEY,
    customer_id INTEGER,
    name VARCHAR(255) NOT NULL,
    location TEXT,
    status VARCHAR(50) DEFAULT 'active',
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ตาราง houses
CREATE TABLE farms.houses (
    house_id SERIAL PRIMARY KEY,
    farm_id INTEGER REFERENCES farms.farms(farm_id) ON DELETE CASCADE,
    name VARCHAR(100),
    area NUMERIC,
    capacity INTEGER,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ตาราง animals
CREATE TABLE farms.animals (
    animal_id SERIAL PRIMARY KEY,
    farm_id INTEGER NOT NULL REFERENCES farms.farms(farm_id) ON DELETE CASCADE,
    house_id INTEGER REFERENCES farms.houses(house_id) ON DELETE SET NULL,
    species VARCHAR(50),
    breed VARCHAR(50),
    birth_date DATE,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ฟังก์ชันและทริกเกอร์อัปเดต updated_at
CREATE OR REPLACE FUNCTION farms.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ลบทริกเกอร์เดิมก่อนสร้างใหม่ (ถ้ามี)
DROP TRIGGER IF EXISTS update_farms_updated_at ON farms.farms;
DROP TRIGGER IF EXISTS update_houses_updated_at ON farms.houses;
DROP TRIGGER IF EXISTS update_animals_updated_at ON farms.animals;

CREATE TRIGGER update_farms_updated_at
BEFORE UPDATE ON farms.farms
FOR EACH ROW EXECUTE PROCEDURE farms.update_updated_at_column();

CREATE TRIGGER update_houses_updated_at
BEFORE UPDATE ON farms.houses
FOR EACH ROW EXECUTE PROCEDURE farms.update_updated_at_column();

CREATE TRIGGER update_animals_updated_at
BEFORE UPDATE ON farms.animals
FOR EACH ROW EXECUTE PROCEDURE farms.update_updated_at_column();

-- ตาราง genetic_factors
CREATE TABLE farms.genetic_factors (
    id SERIAL PRIMARY KEY,
    animal_id INTEGER NOT NULL REFERENCES farms.animals(animal_id) ON DELETE CASCADE,
    test_type VARCHAR(100),
    result TEXT,
    test_date DATE,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

DROP TRIGGER IF EXISTS update_genetic_factors_updated_at ON farms.genetic_factors;

CREATE TRIGGER update_genetic_factors_updated_at
BEFORE UPDATE ON farms.genetic_factors
FOR EACH ROW EXECUTE PROCEDURE farms.update_updated_at_column();

-- ตาราง feed_programs
CREATE TABLE farms.feed_programs (
    id SERIAL PRIMARY KEY,
    farm_id INTEGER NOT NULL REFERENCES farms.farms(farm_id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    effective_start TIMESTAMPTZ NOT NULL,
    effective_end TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

DROP TRIGGER IF EXISTS update_feed_programs_updated_at ON farms.feed_programs;

CREATE TRIGGER update_feed_programs_updated_at
BEFORE UPDATE ON farms.feed_programs
FOR EACH ROW EXECUTE PROCEDURE farms.update_updated_at_column();

-- ตาราง feed_intake
CREATE TABLE farms.feed_intake (
    id SERIAL PRIMARY KEY,
    farm_id INTEGER NOT NULL REFERENCES farms.farms(farm_id) ON DELETE CASCADE,
    animal_id INTEGER REFERENCES farms.animals(animal_id) ON DELETE SET NULL,
    feed_quantity NUMERIC,
    feed_batch_id INTEGER REFERENCES farms.feed_batches(feed_batch_id),
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_feed_intake_feed_batch_id ON farms.feed_intake(feed_batch_id);

DROP TRIGGER IF EXISTS update_feed_intake_updated_at ON farms.feed_intake;

CREATE TRIGGER update_feed_intake_updated_at
BEFORE UPDATE ON farms.feed_intake
FOR EACH ROW EXECUTE PROCEDURE farms.update_updated_at_column();

-- ตาราง environmental_factors
CREATE TABLE farms.environmental_factors (
    id SERIAL PRIMARY KEY,
    farm_id INTEGER NOT NULL REFERENCES farms.farms(farm_id) ON DELETE CASCADE,
    ventilation_rate NUMERIC,
    note TEXT,
    measurement_date DATE,
    effective_start TIMESTAMPTZ NOT NULL,
    effective_end TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

DROP TRIGGER IF EXISTS update_environmental_factors_updated_at ON farms.environmental_factors;

CREATE TRIGGER update_environmental_factors_updated_at
BEFORE UPDATE ON farms.environmental_factors
FOR EACH ROW EXECUTE PROCEDURE farms.update_updated_at_column();

-- ตาราง housing_conditions
CREATE TABLE farms.housing_conditions (
    id SERIAL PRIMARY KEY,
    farm_id INTEGER NOT NULL REFERENCES farms.farms(farm_id) ON DELETE CASCADE,
    flooring_humidity NUMERIC,
    animal_density INTEGER,
    area NUMERIC,
    effective_start TIMESTAMPTZ NOT NULL,
    effective_end TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

DROP TRIGGER IF EXISTS update_housing_conditions_updated_at ON farms.housing_conditions;

CREATE TRIGGER update_housing_conditions_updated_at
BEFORE UPDATE ON farms.housing_conditions
FOR EACH ROW EXECUTE PROCEDURE farms.update_updated_at_column();

-- ตาราง water_quality
CREATE TABLE farms.water_quality (
    id SERIAL PRIMARY KEY,
    farm_id INTEGER NOT NULL REFERENCES farms.farms(farm_id) ON DELETE CASCADE,
    fe NUMERIC,
    pb NUMERIC,
    note TEXT,
    measurement_date DATE,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

DROP TRIGGER IF EXISTS update_water_quality_updated_at ON farms.water_quality;

CREATE TRIGGER update_water_quality_updated_at
BEFORE UPDATE ON farms.water_quality
FOR EACH ROW EXECUTE PROCEDURE farms.update_updated_at_column();

-- ตาราง health_records
CREATE TABLE farms.health_records (
    id SERIAL PRIMARY KEY,
    animal_id INTEGER NOT NULL REFERENCES farms.animals(animal_id) ON DELETE CASCADE,
    health_status TEXT,
    disease VARCHAR(100),
    vaccine TEXT,
    recorded_date DATE,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

DROP TRIGGER IF EXISTS update_health_records_updated_at ON farms.health_records;

CREATE TRIGGER update_health_records_updated_at
BEFORE UPDATE ON farms.health_records
FOR EACH ROW EXECUTE PROCEDURE farms.update_updated_at_column();

-- ตาราง welfare_indicators
CREATE TABLE farms.welfare_indicators (
    id SERIAL PRIMARY KEY,
    animal_id INTEGER NOT NULL REFERENCES farms.animals(animal_id) ON DELETE CASCADE,
    footpad_lesion BOOLEAN,
    stress_hormone NUMERIC,
    recorded_date DATE,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

DROP TRIGGER IF EXISTS update_welfare_indicators_updated_at ON farms.welfare_indicators;

CREATE TRIGGER update_welfare_indicators_updated_at
BEFORE UPDATE ON farms.welfare_indicators
FOR EACH ROW EXECUTE PROCEDURE farms.update_updated_at_column();

-- ตาราง performance_metrics (partitioned)
CREATE TABLE farms.performance_metrics (
    id BIGSERIAL NOT NULL,
    animal_id INTEGER NOT NULL REFERENCES farms.animals(animal_id) ON DELETE CASCADE,
    adg NUMERIC,
    fcr NUMERIC,
    survival_rate NUMERIC,
    pi_score NUMERIC,
    mortality_rate NUMERIC,
    health_score NUMERIC,
    behavior_score NUMERIC,
    body_condition_score NUMERIC,
    stress_level NUMERIC,
    disease_incidence_rate NUMERIC,
    vaccination_status VARCHAR(50),
    recorded_date DATE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    PRIMARY KEY (id, recorded_date)
) PARTITION BY RANGE (recorded_date);

CREATE TABLE farms.performance_metrics_2024 PARTITION OF farms.performance_metrics
    FOR VALUES FROM ('2024-01-01') TO ('2025-01-01');

CREATE TABLE farms.performance_metrics_2025 PARTITION OF farms.performance_metrics
    FOR VALUES FROM ('2025-01-01') TO ('2026-01-01');

DROP TRIGGER IF EXISTS update_performance_metrics_updated_at ON farms.performance_metrics;

CREATE TRIGGER update_performance_metrics_updated_at
BEFORE UPDATE ON farms.performance_metrics
FOR EACH ROW EXECUTE PROCEDURE farms.update_updated_at_column();

-- ตาราง operational_records
CREATE TABLE farms.operational_records (
    id SERIAL PRIMARY KEY,
    farm_id INTEGER NOT NULL REFERENCES farms.farms(farm_id) ON DELETE CASCADE,
    type VARCHAR(100),
    description TEXT,
    record_date DATE,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

DROP TRIGGER IF EXISTS update_operational_records_updated_at ON farms.operational_records;

CREATE TRIGGER update_operational_records_updated_at
BEFORE UPDATE ON farms.operational_records
FOR EACH ROW EXECUTE PROCEDURE farms.update_updated_at_column();

-- Indexes แนะนำ (เพิ่มตามต้องการ)
CREATE INDEX idx_farms_customer_id ON farms.farms(customer_id);
CREATE INDEX idx_animals_farm_id ON farms.animals(farm_id);
CREATE INDEX idx_animals_house_id ON farms.animals(house_id);
CREATE INDEX idx_feed_intake_feed_batch_id ON farms.feed_intake(feed_batch_id);
CREATE INDEX idx_environmental_factors_farm_id ON farms.environmental_factors(farm_id);
CREATE INDEX idx_housing_conditions_farm_id ON farms.housing_conditions(farm_id);
CREATE INDEX idx_water_quality_farm_id ON farms.water_quality(farm_id);
CREATE INDEX idx_health_records_animal_id ON farms.health_records(animal_id);
CREATE INDEX idx_welfare_indicators_animal_id ON farms.welfare_indicators(animal_id);
CREATE INDEX idx_performance_metrics_animal_id ON farms.performance_metrics(animal_id);
CREATE INDEX idx_performance_metrics_recorded_date ON farms.performance_metrics(recorded_date);
CREATE INDEX idx_operational_records_farm_id ON farms.operational_records(farm_id);