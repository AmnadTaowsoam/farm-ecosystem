CREATE SCHEMA IF NOT EXISTS external_factors;

CREATE TABLE external_factors.external_factors (
    id SERIAL PRIMARY KEY,
    farm_id INTEGER NOT NULL REFERENCES farms.farms(farm_id) ON DELETE CASCADE,
    weather JSONB,
    disease_alert JSONB,
    market_price JSONB,
    feed_supply JSONB,
    weather_forecast JSONB,
    disease_risk_score NUMERIC,
    regulatory_changes TEXT,
    record_date DATE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE INDEX idx_external_factors_farm_id ON external_factors.external_factors(farm_id);
CREATE INDEX idx_external_factors_record_date ON external_factors.external_factors(record_date);

CREATE INDEX idx_external_factors_weather_gin ON external_factors.external_factors USING gin (weather);
CREATE INDEX idx_external_factors_disease_alert_gin ON external_factors.external_factors USING gin (disease_alert);

-- Trigger function สำหรับอัปเดต updated_at
CREATE OR REPLACE FUNCTION external_factors.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_external_factors_updated_at ON external_factors.external_factors;

CREATE TRIGGER update_external_factors_updated_at
BEFORE UPDATE ON external_factors.external_factors
FOR EACH ROW EXECUTE PROCEDURE external_factors.update_updated_at_column();