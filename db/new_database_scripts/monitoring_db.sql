-- database monitoring_db;

CREATE SCHEMA IF NOT EXISTS monitoring;

-- 1. alerts (per-customer)
CREATE TABLE monitoring.alerts (
    alert_id     SERIAL       PRIMARY KEY,
    customer_id  INT           NOT NULL,
        -- REFERENCES public.customers(customer_id),
    farm_id      INTEGER       NOT NULL,
    alert_type   VARCHAR(100)  NOT NULL,
    description  TEXT,
    severity     VARCHAR(50)   NOT NULL,
    status       VARCHAR(50)   DEFAULT 'active' NOT NULL,
    created_at   TIMESTAMPTZ   DEFAULT NOW()    NOT NULL,
    resolved_at  TIMESTAMPTZ,
    updated_at   TIMESTAMPTZ   DEFAULT NOW()    NOT NULL
);

-- Composite index for tenant-scoped queries
CREATE INDEX idx_alerts_cust_farm_status
    ON monitoring.alerts(customer_id, farm_id, status);


-- 2. alert_rules (per-customer, if you want each customer to have their own rules)
CREATE TABLE monitoring.alert_rules (
    rule_id      SERIAL       PRIMARY KEY,
    customer_id  INT           NOT NULL,
        -- REFERENCES public.customers(customer_id),
    name         VARCHAR(100)  NOT NULL,
    metric_name  VARCHAR(100)  NOT NULL,
    threshold    NUMERIC       NOT NULL,
    condition    VARCHAR(10)   NOT NULL,  -- e.g. '>', '<', '='
    created_at   TIMESTAMPTZ   DEFAULT NOW()    NOT NULL,
    updated_at   TIMESTAMPTZ   DEFAULT NOW()    NOT NULL
);

-- Composite index for tenant-scoped rule lookup
CREATE INDEX idx_alert_rules_cust_metric
    ON monitoring.alert_rules(customer_id, metric_name);


-- 3. Trigger function to auto-update updated_at
CREATE OR REPLACE FUNCTION monitoring.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ LANGUAGE plpgsql;


-- 4. Attach triggers

-- alerts.updated_at
DROP TRIGGER IF EXISTS update_alerts_updated_at ON monitoring.alerts;
CREATE TRIGGER update_alerts_updated_at
  BEFORE UPDATE ON monitoring.alerts
  FOR EACH ROW EXECUTE PROCEDURE monitoring.update_updated_at_column();

-- alert_rules.updated_at
DROP TRIGGER IF EXISTS update_alert_rules_updated_at ON monitoring.alert_rules;
CREATE TRIGGER update_alert_rules_updated_at
  BEFORE UPDATE ON monitoring.alert_rules
  FOR EACH ROW EXECUTE PROCEDURE monitoring.update_updated_at_column();


