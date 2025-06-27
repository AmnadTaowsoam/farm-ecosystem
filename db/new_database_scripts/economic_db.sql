CREATE SCHEMA IF NOT EXISTS economics;

CREATE TABLE economics.economic_data (
    id SERIAL PRIMARY KEY,
    farm_id INTEGER,
    cost_type VARCHAR(100) NOT NULL,
    amount NUMERIC,
    animal_price NUMERIC,
    feed_cost NUMERIC,
    labor_cost NUMERIC,
    utility_cost NUMERIC,
    medication_cost NUMERIC,
    maintenance_cost NUMERIC,
    other_costs NUMERIC,
    record_date DATE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE INDEX idx_economic_data_farm_id ON economics.economic_data(farm_id);
CREATE INDEX idx_economic_data_record_date ON economics.economic_data(record_date);

-- Trigger function สำหรับอัปเดต updated_at
CREATE OR REPLACE FUNCTION economics.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_economic_data_updated_at ON economics.economic_data;

CREATE TRIGGER update_economic_data_updated_at
BEFORE UPDATE ON economics.economic_data
FOR EACH ROW EXECUTE PROCEDURE economics.update_updated_at_column();