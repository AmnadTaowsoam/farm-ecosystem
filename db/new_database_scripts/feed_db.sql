-- 1. สร้าง Schema
CREATE SCHEMA IF NOT EXISTS feeds;

-- 2. สร้างตารางหลัก feed_batches (Partitioned) พร้อม Composite PK
CREATE TABLE feeds.feed_batches (
    feed_batch_id SERIAL NOT NULL,
    production_date TIMESTAMPTZ NOT NULL,
    farm_id INTEGER,
    formula_id INTEGER,
    formula_no INTEGER,
    line_no VARCHAR(50),
    batch_no VARCHAR(50),
    feed_type VARCHAR(50),
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    PRIMARY KEY (production_date, feed_batch_id)
) PARTITION BY RANGE (production_date);

-- 3. สร้าง partition tables (ทุก 6 เดือน)
CREATE TABLE feeds.feed_batches_2025_h1 PARTITION OF feeds.feed_batches
  FOR VALUES FROM ('2025-01-01') TO ('2025-07-01');
CREATE TABLE feeds.feed_batches_2025_h2 PARTITION OF feeds.feed_batches
  FOR VALUES FROM ('2025-07-01') TO ('2026-01-01');
CREATE TABLE feeds.feed_batches_2026_h1 PARTITION OF feeds.feed_batches
  FOR VALUES FROM ('2026-01-01') TO ('2026-07-01');
CREATE TABLE feeds.feed_batches_2026_h2 PARTITION OF feeds.feed_batches
  FOR VALUES FROM ('2026-07-01') TO ('2027-01-01');
CREATE TABLE feeds.feed_batches_2027_h1 PARTITION OF feeds.feed_batches
  FOR VALUES FROM ('2027-01-01') TO ('2027-07-01');
CREATE TABLE feeds.feed_batches_2027_h2 PARTITION OF feeds.feed_batches
  FOR VALUES FROM ('2027-07-01') TO ('2028-01-01');

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
    production_date TIMESTAMPTZ NOT NULL,
    feed_batch_id INTEGER NOT NULL,
    property_name VARCHAR(100) NOT NULL,
    property_value NUMERIC NOT NULL,
    unit VARCHAR(50),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT fk_physical_quality_batch
      FOREIGN KEY (production_date, feed_batch_id)
      REFERENCES feeds.feed_batches (production_date, feed_batch_id)
      ON DELETE CASCADE
);

-- 6. สร้างตารางย่อย (Chemical Quality)
CREATE TABLE feeds.chemical_quality (
    id SERIAL PRIMARY KEY,
    production_date TIMESTAMPTZ NOT NULL,
    feed_batch_id INTEGER NOT NULL,
    nutrient_name VARCHAR(100) NOT NULL,
    amount NUMERIC NOT NULL,
    unit VARCHAR(50),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT fk_chemical_quality_batch
      FOREIGN KEY (production_date, feed_batch_id)
      REFERENCES feeds.feed_batches (production_date, feed_batch_id)
      ON DELETE CASCADE
);

-- 7. สร้างตารางย่อย (Pellet Mill Condition)
CREATE TABLE feeds.pellet_mill_condition (
    id SERIAL PRIMARY KEY,
    production_date TIMESTAMPTZ NOT NULL,
    feed_batch_id INTEGER NOT NULL,
    parameter_name VARCHAR(100) NOT NULL,
    parameter_value VARCHAR(255),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT fk_pellet_mill_batch
      FOREIGN KEY (production_date, feed_batch_id)
      REFERENCES feeds.feed_batches (production_date, feed_batch_id)
      ON DELETE CASCADE
);

-- 8. สร้างตารางย่อย (Mixing Condition)
CREATE TABLE feeds.mixing_condition (
    id SERIAL PRIMARY KEY,
    production_date TIMESTAMPTZ NOT NULL,
    feed_batch_id INTEGER NOT NULL,
    parameter_name VARCHAR(100) NOT NULL,
    parameter_value VARCHAR(255),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT fk_mixing_condition_batch
      FOREIGN KEY (production_date, feed_batch_id)
      REFERENCES feeds.feed_batches (production_date, feed_batch_id)
      ON DELETE CASCADE
);

-- 9. สร้างตารางย่อย (Grinding Condition)
CREATE TABLE feeds.grinding_condition (
    id SERIAL PRIMARY KEY,
    production_date TIMESTAMPTZ NOT NULL,
    feed_batch_id INTEGER NOT NULL,
    parameter_name VARCHAR(100) NOT NULL,
    parameter_value VARCHAR(255),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT fk_grinding_condition_batch
      FOREIGN KEY (production_date, feed_batch_id)
      REFERENCES feeds.feed_batches (production_date, feed_batch_id)
      ON DELETE CASCADE
);

-- 10. ตาราง feed_batch_assignments พร้อม Composite FK
CREATE TABLE feeds.feed_batch_assignments (
  assignment_id SERIAL PRIMARY KEY,
  production_date TIMESTAMPTZ NOT NULL,
  feed_batch_id INTEGER NOT NULL,
  farm_id INTEGER,
  house_id INTEGER,
  animal_id INTEGER,
  assigned_start TIMESTAMPTZ NOT NULL,
  assigned_end TIMESTAMPTZ,
  feed_quantity NUMERIC,
  note TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  CONSTRAINT fk_assignment_batch
    FOREIGN KEY (production_date, feed_batch_id)
    REFERENCES feeds.feed_batches (production_date, feed_batch_id)
    ON DELETE CASCADE
);
CREATE INDEX idx_feed_batch_assignments_feed_batch_id ON feeds.feed_batch_assignments(feed_batch_id);
CREATE INDEX idx_feed_batch_assignments_farm_id ON feeds.feed_batch_assignments(farm_id);

-- 11. Trigger update_updated_at_column
CREATE OR REPLACE FUNCTION feeds.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_feed_batches_updated_at ON feeds.feed_batches;
CREATE TRIGGER update_feed_batches_updated_at
BEFORE UPDATE ON feeds.feed_batches
FOR EACH ROW EXECUTE PROCEDURE feeds.update_updated_at_column();

DROP TRIGGER IF EXISTS update_feed_batch_assignments_updated_at ON feeds.feed_batch_assignments;
CREATE TRIGGER update_feed_batch_assignments_updated_at
BEFORE UPDATE ON feeds.feed_batch_assignments
FOR EACH ROW EXECUTE PROCEDURE feeds.update_updated_at_column();