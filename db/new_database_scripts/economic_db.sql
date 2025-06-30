-- database: your_database_name;

CREATE SCHEMA IF NOT EXISTS economics;

-- 1. economic_data with tenant isolation
CREATE TABLE economics.economic_data (
    id               SERIAL PRIMARY KEY,
    customer_id      INT NOT NULL,
        -- REFERENCES public.customers(customer_id),
    farm_id          INTEGER                   NOT NULL,
    cost_type        VARCHAR(100)              NOT NULL,
    amount           NUMERIC,
    animal_price     NUMERIC,
    feed_cost        NUMERIC,
    labor_cost       NUMERIC,
    utility_cost     NUMERIC,
    medication_cost  NUMERIC,
    maintenance_cost NUMERIC,
    other_costs      NUMERIC,
    record_date      DATE                      NOT NULL,
    created_at       TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at       TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Composite index to speed up tenant- and farm-scoped queries by date
CREATE INDEX idx_economic_data_cust_farm_date
    ON economics.economic_data(customer_id, farm_id, record_date);

-- Trigger function for keeping updated_at current
CREATE OR REPLACE FUNCTION economics.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Install trigger for BEFORE UPDATE
DROP TRIGGER IF EXISTS update_economic_data_updated_at
    ON economics.economic_data;

CREATE TRIGGER update_economic_data_updated_at
BEFORE UPDATE ON economics.economic_data
FOR EACH ROW EXECUTE PROCEDURE economics.update_updated_at_column();
