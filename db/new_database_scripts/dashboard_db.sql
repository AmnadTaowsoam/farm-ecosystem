-- database: dashboard_db;

CREATE SCHEMA IF NOT EXISTS dashboard;

-- 1. dashboard_cache
CREATE TABLE dashboard.dashboard_cache (
    cache_id      SERIAL PRIMARY KEY,
    customer_id   INT NOT NULL,
        --REFERENCES public.customers(customer_id)
    farm_id       INTEGER                   NOT NULL,
    metric_name   VARCHAR(100)              NOT NULL,
    metric_value  NUMERIC                   NOT NULL,
    metric_date   DATE                      NOT NULL,
    updated_at    TIMESTAMPTZ DEFAULT NOW()
);

-- index รวม customer_id เพื่อการกรอง tenant
CREATE INDEX idx_dashboard_cache_cust_farm_metric_date
    ON dashboard.dashboard_cache(customer_id, farm_id, metric_name, metric_date);


-- trigger อัปเดต updated_at อัตโนมัติ
CREATE OR REPLACE FUNCTION dashboard.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_dashboard_cache_updated_at
    ON dashboard.dashboard_cache;

CREATE TRIGGER update_dashboard_cache_updated_at
BEFORE UPDATE ON dashboard.dashboard_cache
FOR EACH ROW EXECUTE PROCEDURE dashboard.update_updated_at_column();


-- 2. user_dashboard_config
CREATE TABLE dashboard.user_dashboard_config (
    config_id     SERIAL PRIMARY KEY,
    customer_id   INT NOT NULL,
        --REFERENCES public.customers(customer_id)
    user_id       INTEGER                   NOT NULL,
    config        JSONB                     NOT NULL,
    updated_at    TIMESTAMPTZ DEFAULT NOW()
);

-- index รวม customer_id เพื่อการกรอง tenant
CREATE INDEX idx_user_dashboard_config_cust_user
    ON dashboard.user_dashboard_config(customer_id, user_id);

-- trigger อัปเดต updated_at อัตโนมัติ
DROP TRIGGER IF EXISTS update_user_dashboard_config_updated_at
    ON dashboard.user_dashboard_config;

CREATE TRIGGER update_user_dashboard_config_updated_at
BEFORE UPDATE ON dashboard.user_dashboard_config
FOR EACH ROW EXECUTE PROCEDURE dashboard.update_updated_at_column();

