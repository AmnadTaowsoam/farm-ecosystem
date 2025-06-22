-- database analytics_db;

CREATE SCHEMA IF NOT EXISTS analytics;

CREATE TABLE analytics.feature_store (
    feature_id SERIAL PRIMARY KEY,
    animal_id INTEGER,
    feature_name VARCHAR(100) NOT NULL,
    feature_value NUMERIC NOT NULL,
    feature_date TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_feature_store_animal_feature_date
    ON analytics.feature_store(animal_id, feature_name, feature_date);

CREATE OR REPLACE FUNCTION analytics.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_feature_store_updated_at ON analytics.feature_store;

CREATE TRIGGER update_feature_store_updated_at
BEFORE UPDATE ON analytics.feature_store
FOR EACH ROW EXECUTE PROCEDURE analytics.update_updated_at_column();


CREATE TABLE analytics.model_results (
    result_id SERIAL PRIMARY KEY,
    animal_id INTEGER,
    model_name VARCHAR(100) NOT NULL,
    prediction JSONB NOT NULL,
    anomaly_score NUMERIC,
    result_date TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_model_results_animal_model_date
    ON analytics.model_results(animal_id, model_name, result_date);

DROP TRIGGER IF EXISTS update_model_results_updated_at ON analytics.model_results;

CREATE TRIGGER update_model_results_updated_at
BEFORE UPDATE ON analytics.model_results
FOR EACH ROW EXECUTE PROCEDURE analytics.update_updated_at_column();

