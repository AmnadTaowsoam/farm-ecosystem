-- Migration Script: feeds_schema_full.sql

-- 1. สร้าง Schema
CREATE SCHEMA IF NOT EXISTS feeds;

-- 2. สร้างตารางหลัก feed_batches (Partitioned)
CREATE TABLE feeds.feed_batches (
    feed_batch_id SERIAL PRIMARY KEY,
    farm_id INTEGER,
    formula_id INTEGER,
    formula_no INTEGER,
    line_no VARCHAR(50),
    batch_no VARCHAR(50),
    production_date TIMESTAMPTZ NOT NULL,
    feed_type VARCHAR(50),
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
) PARTITION BY RANGE (production_date);

-- 3. สร้าง partition tables (ทุก 6 เดือน)
CREATE TABLE feeds.feed_batches_2025_h1 PARTITION OF feeds.feed_batches
  FOR VALUES FROM ('2025-01-01') TO ('2025-07-01');

CREATE TABLE feeds.feed_batches_2025_h2 PARTITION OF feeds.feed_batches
  FOR VALUES FROM ('2025-07-01') TO ('2026-01-01');

CREATE TABLE feeds.feed_batches_2026_h1 PARTITION OF feeds.feed_batches
  FOR VALUES FROM ('2026-01-01') TO ('2026-07-01');

CREATE TABLE feeds.feed_batches_2026_h2 PARTITION OF feeds.feed_batches
  FOR VALUES FROM ('2026-07-01') TO ('2026-12-31');

CREATE TABLE feeds.feed_batches_2027_h1 PARTITION OF feeds.feed_batches
  FOR VALUES FROM ('2027-01-01') TO ('2027-07-01');

CREATE TABLE feeds.feed_batches_2027_h2 PARTITION OF feeds.feed_batches
  FOR VALUES FROM ('2027-07-01') TO ('2027-12-31');

-- 4. สร้าง index บน partition tables เพื่อเร่ง query
CREATE INDEX idx_feed_batches_2025_h1_farm_id ON feeds.feed_batches_2025_h1(farm_id);
CREATE INDEX idx_feed_batches_2025_h2_farm_id ON feeds.feed_batches_2025_h2(farm_id);
CREATE INDEX idx_feed_batches_2026_h1_farm_id ON feeds.feed_batches_2026_h1(farm_id);
CREATE INDEX idx_feed_batches_2026_h2_farm_id ON feeds.feed_batches_2026_h2(farm_id);
CREATE INDEX idx_feed_batches_2027_h1_farm_id ON feeds.feed_batches_2027_h1(farm_id);
CREATE INDEX idx_feed_batches_2027_h2_farm_id ON feeds.feed_batches_2027_h2(farm_id);

-- 5. สร้างตารางย่อย (Physical Quality)
CREATE TABLE feeds.physical_quality (
    id SERIAL PRIMARY KEY,
    feed_batch_id INTEGER NOT NULL REFERENCES feeds.feed_batches(feed_batch_id) ON DELETE CASCADE,
    property_name VARCHAR(100) NOT NULL,
    property_value NUMERIC NOT NULL,
    unit VARCHAR(50),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. สร้างตารางย่อย (Chemical Quality)
CREATE TABLE feeds.chemical_quality (
    id SERIAL PRIMARY KEY,
    feed_batch_id INTEGER NOT NULL REFERENCES feeds.feed_batches(feed_batch_id) ON DELETE CASCADE,
    nutrient_name VARCHAR(100) NOT NULL,
    amount NUMERIC NOT NULL,
    unit VARCHAR(50),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. สร้างตารางย่อย (Pellet Mill Condition)
CREATE TABLE feeds.pellet_mill_condition (
    id SERIAL PRIMARY KEY,
    feed_batch_id INTEGER NOT NULL REFERENCES feeds.feed_batches(feed_batch_id) ON DELETE CASCADE,
    parameter_name VARCHAR(100) NOT NULL,
    parameter_value VARCHAR(255),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. สร้างตารางย่อย (Mixing Condition)
CREATE TABLE feeds.mixing_condition (
    id SERIAL PRIMARY KEY,
    feed_batch_id INTEGER NOT NULL REFERENCES feeds.feed_batches(feed_batch_id) ON DELETE CASCADE,
    parameter_name VARCHAR(100) NOT NULL,
    parameter_value VARCHAR(255),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. สร้างตารางย่อย (Grinding Condition)
CREATE TABLE feeds.grinding_condition (
    id SERIAL PRIMARY KEY,
    feed_batch_id INTEGER NOT NULL REFERENCES feeds.feed_batches(feed_batch_id) ON DELETE CASCADE,
    parameter_name VARCHAR(100) NOT NULL,
    parameter_value VARCHAR(255),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. สร้างตาราง feed_batch_assignments
CREATE TABLE feeds.feed_batch_assignments (
  assignment_id SERIAL PRIMARY KEY,
  feed_batch_id INTEGER NOT NULL REFERENCES feeds.feed_batches(feed_batch_id) ON DELETE CASCADE,
  farm_id INTEGER,
  house_id INTEGER,
  animal_id INTEGER,
  assigned_start TIMESTAMPTZ NOT NULL,
  assigned_end TIMESTAMPTZ,
  feed_quantity NUMERIC,
  note TEXT,
  device_id INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE INDEX idx_feed_batch_assignments_feed_batch_id ON feeds.feed_batch_assignments(feed_batch_id);
CREATE INDEX idx_feed_batch_assignments_farm_id ON feeds.feed_batch_assignments(farm_id);

-- 11. สร้าง trigger function สำหรับอัปเดต updated_at
CREATE OR REPLACE FUNCTION feeds.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 12. Drop triggers หากมีอยู่แล้ว
DROP TRIGGER IF EXISTS update_feed_batches_updated_at ON feeds.feed_batches;
DROP TRIGGER IF EXISTS update_feed_batch_assignments_updated_at ON feeds.feed_batch_assignments;

-- 13. สร้าง triggers ใหม่สำหรับ updated_at อัตโนมัติ
CREATE TRIGGER update_feed_batches_updated_at
BEFORE UPDATE ON feeds.feed_batches
FOR EACH ROW EXECUTE PROCEDURE feeds.update_updated_at_column();

CREATE TRIGGER update_feed_batch_assignments_updated_at
BEFORE UPDATE ON feeds.feed_batch_assignments
FOR EACH ROW EXECUTE PROCEDURE feeds.update_updated_at_column();
