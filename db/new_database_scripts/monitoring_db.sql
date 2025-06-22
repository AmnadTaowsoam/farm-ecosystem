-- database monitoring_db;

CREATE SCHEMA IF NOT EXISTS monitoring;

CREATE TABLE monitoring.alerts (
    alert_id SERIAL PRIMARY KEY,
    farm_id INTEGER,
    alert_type VARCHAR(100) NOT NULL,
    description TEXT,
    severity VARCHAR(50) NOT NULL,
    status VARCHAR(50) DEFAULT 'active' NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    resolved_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE INDEX idx_alerts_farm_status
    ON monitoring.alerts(farm_id, status);

-- Trigger สำหรับอัปเดต updated_at อัตโนมัติ
CREATE OR REPLACE FUNCTION monitoring.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_alerts_updated_at ON monitoring.alerts;

CREATE TRIGGER update_alerts_updated_at
BEFORE UPDATE ON monitoring.alerts
FOR EACH ROW EXECUTE PROCEDURE monitoring.update_updated_at_column();


CREATE TABLE monitoring.alert_rules (
    rule_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    metric_name VARCHAR(100) NOT NULL,
    threshold NUMERIC NOT NULL,
    condition VARCHAR(10) NOT NULL,  -- เช่น '>', '<', '='
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Trigger สำหรับอัปเดต updated_at อัตโนมัติ
DROP TRIGGER IF EXISTS update_alert_rules_updated_at ON monitoring.alert_rules;

CREATE TRIGGER update_alert_rules_updated_at
BEFORE UPDATE ON monitoring.alert_rules
FOR EACH ROW EXECUTE PROCEDURE monitoring.update_updated_at_column();

