-- database analytics_db;

CREATE SCHEMA IF NOT EXISTS analytics;

-- ลบตารางเก่าก่อนสร้างใหม่
DROP TABLE IF EXISTS analytics.feature_store CASCADE;
DROP TABLE IF EXISTS analytics.model_results CASCADE;

-- 1. feature_store
CREATE TABLE analytics.feature_store (
    feature_id     SERIAL PRIMARY KEY,
    customer_id    INT NOT NULL,
        --REFERENCES public.customers(customer_id)
    animal_id      INTEGER             NOT NULL,
    feature_name   VARCHAR(100)        NOT NULL,
    feature_value  NUMERIC             NOT NULL,
    feature_date   TIMESTAMPTZ         NOT NULL,
    created_at     TIMESTAMPTZ DEFAULT NOW(),
    updated_at     TIMESTAMPTZ DEFAULT NOW()
);

-- index: คอมโพสิต customer_id + animal_id + feature_date
CREATE INDEX idx_feature_store_customer_animal_date
    ON analytics.feature_store(customer_id, animal_id, feature_date);


-- trigger เพื่ออัพเดต updated_at อัตโนมัติ
CREATE OR REPLACE FUNCTION analytics.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_feature_store_updated_at
    ON analytics.feature_store;

CREATE TRIGGER update_feature_store_updated_at
BEFORE UPDATE ON analytics.feature_store
FOR EACH ROW EXECUTE PROCEDURE analytics.update_updated_at_column();


-- 2. model_results
CREATE TABLE analytics.model_results (
    result_id      SERIAL PRIMARY KEY,
    customer_id    INT NOT NULL,
        --REFERENCES public.customers(customer_id)
    animal_id      INTEGER             NOT NULL,
    model_name     VARCHAR(100)        NOT NULL,
    prediction     JSONB               NOT NULL,
    anomaly_score  NUMERIC,
    result_date    TIMESTAMPTZ         NOT NULL,
    created_at     TIMESTAMPTZ DEFAULT NOW(),
    updated_at     TIMESTAMPTZ DEFAULT NOW()
);

-- index: คอมโพสิต customer_id + animal_id + result_date
CREATE INDEX idx_model_results_customer_animal_date
    ON analytics.model_results(customer_id, animal_id, result_date);

-- reuse trigger function
DROP TRIGGER IF EXISTS update_model_results_updated_at
    ON analytics.model_results;

CREATE TRIGGER update_model_results_updated_at
BEFORE UPDATE ON analytics.model_results
FOR EACH ROW EXECUTE PROCEDURE analytics.update_updated_at_column();