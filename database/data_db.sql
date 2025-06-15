-- สร้าง Schema สำหรับระบบ
CREATE SCHEMA IF NOT EXISTS smart_farming AUTHORIZATION postgres;

-- ตารางข้อมูลลูกค้า
CREATE TABLE smart_farming.customers (
    customer_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(50),
    address TEXT,
    billing_info JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ตารางข้อมูล subscriptions
CREATE TABLE smart_farming.subscriptions (
    subscription_id SERIAL PRIMARY KEY,
    customer_id INTEGER REFERENCES smart_farming.customers(customer_id) ON DELETE CASCADE,
    plan_type VARCHAR(100),
    start_date DATE,
    end_date DATE,
    status VARCHAR(50) DEFAULT 'active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ตารางข้อมูลฟาร์ม
CREATE TABLE smart_farming.farms (
    farm_id SERIAL PRIMARY KEY,
    customer_id INTEGER REFERENCES smart_farming.customers(customer_id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    location TEXT,
    status VARCHAR(50) DEFAULT 'active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ตารางข้อมูลเล้า (houses)
CREATE TABLE smart_farming.houses (
    house_id SERIAL PRIMARY KEY,
    farm_id INTEGER REFERENCES smart_farming.farms(farm_id) ON DELETE CASCADE,
    name VARCHAR(100),
    area NUMERIC,
    capacity INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ตารางข้อมูล devices
CREATE TABLE smart_farming.devices (
    device_id SERIAL PRIMARY KEY,
    house_id INTEGER REFERENCES smart_farming.houses(house_id) ON DELETE CASCADE,
    type VARCHAR(100),
    model VARCHAR(100),
    serial_number VARCHAR(100),
    install_date DATE,
    calibration_date DATE,
    last_maintenance DATE,
    location_detail TEXT,
    status VARCHAR(50) DEFAULT 'active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ตารางข้อมูลสัตว์
CREATE TABLE smart_farming.animals (
    animal_id SERIAL PRIMARY KEY,
    farm_id INTEGER NOT NULL REFERENCES smart_farming.farms(farm_id) ON DELETE CASCADE,
    house_id INTEGER REFERENCES smart_farming.houses(house_id) ON DELETE SET NULL,
    species VARCHAR(50),
    breed VARCHAR(50),
    birth_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ฟังก์ชัน Trigger สำหรับอัปเดต updated_at
CREATE OR REPLACE FUNCTION smart_farming.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger บนตาราง animals
CREATE TRIGGER update_animals_updated_at
BEFORE UPDATE ON smart_farming.animals
FOR EACH ROW EXECUTE PROCEDURE smart_farming.update_updated_at_column();

-- ตารางข้อมูล Genetic Factors
CREATE TABLE smart_farming.genetic_factors (
    id SERIAL PRIMARY KEY,
    animal_id INTEGER NOT NULL REFERENCES smart_farming.animals(animal_id) ON DELETE CASCADE,
    test_type VARCHAR(100),
    result TEXT,
    test_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ตาราง feeding programs
CREATE TABLE smart_farming.feed_programs (
    id SERIAL PRIMARY KEY,
    farm_id INTEGER NOT NULL REFERENCES smart_farming.farms(farm_id) ON DELETE CASCADE,
    name VARCHAR(100),
    description TEXT,
    effective_start TIMESTAMP WITH TIME ZONE NOT NULL,
    effective_end TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ตาราง feed intake
CREATE TABLE smart_farming.feed_intake (
    id SERIAL PRIMARY KEY,
    farm_id INTEGER NOT NULL REFERENCES smart_farming.farms(farm_id) ON DELETE CASCADE,
    animal_id INTEGER REFERENCES smart_farming.animals(animal_id) ON DELETE SET NULL,
    feed_quantity NUMERIC,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ตาราง feed composition
CREATE TABLE smart_farming.feed_composition (
    id SERIAL PRIMARY KEY,
    farm_id INTEGER NOT NULL REFERENCES smart_farming.farms(farm_id) ON DELETE CASCADE,
    feed_no VARCHAR(13),
    feed_composition VARCHAR(13),
    effective_start TIMESTAMP WITH TIME ZONE NOT NULL,
    effective_end TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ตาราง Feed Analysis (สูตรอาหาร)
CREATE TABLE smart_farming.feed_analysis (
    id SERIAL PRIMARY KEY,
    program_id INTEGER NOT NULL REFERENCES smart_farming.feed_programs(id) ON DELETE CASCADE,
    component VARCHAR(100),
    value NUMERIC,
    unit VARCHAR(20),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ตาราง Feed Quality
CREATE TABLE smart_farming.feed_quality (
    id SERIAL PRIMARY KEY,
    program_id INTEGER NOT NULL REFERENCES smart_farming.feed_programs(id) ON DELETE CASCADE,
    moisture NUMERIC,
    protein NUMERIC,
    fat NUMERIC,
    fiber NUMERIC,
    ash NUMERIC,
    ge_energy NUMERIC,
    de_energy NUMERIC,
    me_energy NUMERIC,
    ne_energy NUMERIC,
    ph NUMERIC,
    mineral NUMERIC,
    effective_start TIMESTAMP WITH TIME ZONE NOT NULL,
    effective_end TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ตาราง Environmental Factors (manual)
CREATE TABLE smart_farming.environmental_factors (
    id SERIAL PRIMARY KEY,
    farm_id INTEGER NOT NULL REFERENCES smart_farming.farms(farm_id) ON DELETE CASCADE,
    ventilation_rate NUMERIC,
    note TEXT,
    measurement_date DATE,
    effective_start TIMESTAMP WITH TIME ZONE NOT NULL,
    effective_end TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ตาราง Housing Conditions
CREATE TABLE smart_farming.housing_conditions (
    id SERIAL PRIMARY KEY,
    farm_id INTEGER NOT NULL REFERENCES smart_farming.farms(farm_id) ON DELETE CASCADE,
    flooring_humidity NUMERIC,
    animal_density INTEGER,
    area NUMERIC,
    effective_start TIMESTAMP WITH TIME ZONE NOT NULL,
    effective_end TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ตาราง Water Quality (manual)
CREATE TABLE smart_farming.water_quality (
    id SERIAL PRIMARY KEY,
    farm_id INTEGER NOT NULL REFERENCES smart_farming.farms(farm_id) ON DELETE CASCADE,
    fe NUMERIC,
    pb NUMERIC,
    note TEXT,
    measurement_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ตาราง Health Records
CREATE TABLE smart_farming.health_records (
    id SERIAL PRIMARY KEY,
    animal_id INTEGER NOT NULL REFERENCES smart_farming.animals(animal_id) ON DELETE CASCADE,
    health_status TEXT,
    disease VARCHAR(100),
    vaccine TEXT,
    recorded_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ตาราง Welfare Indicators
CREATE TABLE smart_farming.welfare_indicators (
    id SERIAL PRIMARY KEY,
    animal_id INTEGER NOT NULL REFERENCES smart_farming.animals(animal_id) ON DELETE CASCADE,
    footpad_lesion BOOLEAN,
    stress_hormone NUMERIC,
    recorded_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ตาราง Performance Metrics (Partitioned)
CREATE TABLE smart_farming.performance_metrics (
    id BIGSERIAL NOT NULL,
    animal_id INTEGER NOT NULL REFERENCES smart_farming.animals(animal_id) ON DELETE CASCADE,
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
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (id, recorded_date)
) PARTITION BY RANGE (recorded_date);

CREATE TABLE smart_farming.performance_metrics_2024 PARTITION OF smart_farming.performance_metrics
    FOR VALUES FROM ('2024-01-01') TO ('2025-01-01');

CREATE TABLE smart_farming.performance_metrics_2025 PARTITION OF smart_farming.performance_metrics
    FOR VALUES FROM ('2025-01-01') TO ('2026-01-01');

-- ตาราง Operational Records (manual inputs)
CREATE TABLE smart_farming.operational_records (
    id SERIAL PRIMARY KEY,
    farm_id INTEGER NOT NULL REFERENCES smart_farming.farms(farm_id) ON DELETE CASCADE,
    type VARCHAR(100),
    description TEXT,
    record_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ตาราง Economic Data
CREATE TABLE smart_farming.economic_data (
    id SERIAL PRIMARY KEY,
    farm_id INTEGER NOT NULL REFERENCES smart_farming.farms(farm_id) ON DELETE CASCADE,
    cost_type VARCHAR(100),
    amount NUMERIC,
    animal_price NUMERIC,
    feed_cost NUMERIC,
    labor_cost NUMERIC,
    utility_cost NUMERIC,
    medication_cost NUMERIC,
    maintenance_cost NUMERIC,
    other_costs NUMERIC,
    record_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ตาราง External Factors
CREATE TABLE smart_farming.external_factors (
    id SERIAL PRIMARY KEY,
    farm_id INTEGER NOT NULL REFERENCES smart_farming.farms(farm_id) ON DELETE CASCADE,
    weather JSONB,
    disease_alert JSONB,
    market_price JSONB,
    feed_supply JSONB,
    weather_forecast JSONB,
    disease_risk_score NUMERIC,
    regulatory_changes TEXT,
    record_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes ตัวอย่าง
CREATE INDEX idx_animals_farm_id ON smart_farming.animals(farm_id);
CREATE INDEX idx_animals_house_id ON smart_farming.animals(house_id);
CREATE INDEX idx_genetic_factors_animal_id ON smart_farming.genetic_factors(animal_id);
CREATE INDEX idx_feed_analysis_program_id ON smart_farming.feed_analysis(program_id);
CREATE INDEX idx_performance_metrics_animal_id ON smart_farming.performance_metrics(animal_id);
CREATE INDEX idx_performance_metrics_recorded_date ON smart_farming.performance_metrics(recorded_date);
CREATE INDEX idx_health_records_animal_id ON smart_farming.health_records(animal_id);
CREATE INDEX idx_environmental_factors_farm_id ON smart_farming.environmental_factors(farm_id);
CREATE INDEX idx_environmental_factors_measurement_date ON smart_farming.environmental_factors(measurement_date);
CREATE INDEX idx_external_factors_farm_id ON smart_farming.external_factors(farm_id);
CREATE INDEX idx_external_factors_record_date ON smart_farming.external_factors(record_date);

-- GIN Index สำหรับ JSONB
CREATE INDEX idx_external_factors_weather_gin ON smart_farming.external_factors USING gin (weather jsonb_path_ops);
CREATE INDEX idx_external_factors_disease_alert_gin ON smart_farming.external_factors USING gin (disease_alert jsonb_path_ops);

-- Trigger สำหรับอัปเดต updated_at อัตโนมัติ (ตัวอย่างกับ animals)
CREATE OR REPLACE FUNCTION smart_farming.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_animals_updated_at
BEFORE UPDATE ON smart_farming.animals
FOR EACH ROW EXECUTE PROCEDURE smart_farming.update_updated_at_column();
