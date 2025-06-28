-- database: devices_db;

CREATE SCHEMA IF NOT EXISTS devices;

------------------------- Start Device management ----------------------------------------------------

-- 2.50) ตารางกลุ่มอุปกรณ์
CREATE TABLE devices.device_groups (
  group_id      SERIAL PRIMARY KEY,
  customer_id   INT NOT NULL REFERENCES public.customers(customer_id),
  name          VARCHAR(100) NOT NULL,
  note          TEXT,
  category      VARCHAR(50),
  parent_id     INTEGER REFERENCES devices.device_groups(group_id) ON DELETE CASCADE,
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

-- Index ช่วยกรองตาม tenant
CREATE INDEX idx_device_groups_cust
  ON devices.device_groups(customer_id);


-- Trigger อัปเดต updated_at อัตโนมัติ สำหรับ device_groups
CREATE OR REPLACE FUNCTION devices.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_device_groups_updated_at
  ON devices.device_groups;

CREATE TRIGGER update_device_groups_updated_at
BEFORE UPDATE ON devices.device_groups
FOR EACH ROW EXECUTE PROCEDURE devices.update_updated_at_column();


-- 2.51) หมวดหมู่อุปกรณ์ (device_types)  -- shared reference data, ไม่เพิ่ม customer_id
CREATE TABLE devices.device_types (
  type_id         SERIAL PRIMARY KEY,
  name            VARCHAR(100) UNIQUE NOT NULL,
  icon_css_class  VARCHAR(50),
  default_image_url TEXT,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

DROP TRIGGER IF EXISTS update_device_types_updated_at
  ON devices.device_types;

CREATE TRIGGER update_device_types_updated_at
BEFORE UPDATE ON devices.device_types
FOR EACH ROW EXECUTE PROCEDURE devices.update_updated_at_column();


-- 2.52) อุปกรณ์ (devices)
CREATE TABLE devices.devices (
  device_id         SERIAL PRIMARY KEY,
  customer_id       INT NOT NULL REFERENCES public.customers(customer_id),
  house_id          INTEGER,
  type_id           INTEGER REFERENCES devices.device_types(type_id) ON DELETE SET NULL,
  group_id          INTEGER REFERENCES devices.device_groups(group_id) ON DELETE SET NULL,
  model             VARCHAR(100),
  serial_number     VARCHAR(100),
  install_date      DATE,
  calibration_date  DATE,
  last_maintenance  DATE,
  location_detail   TEXT,
  manufacturer      VARCHAR(255),
  purchase_date     DATE,
  warranty_expiry   DATE,
  specs             JSONB,
  location_latitude NUMERIC,
  location_longitude NUMERIC,
  firmware_version  VARCHAR(50),
  ip_address        VARCHAR(45),
  mac_address       VARCHAR(17),
  last_seen         TIMESTAMPTZ,
  tags              TEXT[] DEFAULT '{}',
  config            JSONB,
  credentials       JSONB,
  build_code        TEXT,
  build_date        TIMESTAMPTZ,
  status            VARCHAR(50) DEFAULT 'active',
  created_at        TIMESTAMPTZ DEFAULT NOW(),
  updated_at        TIMESTAMPTZ DEFAULT NOW()
);

-- Index ช่วยกรองตาม tenant และ house
CREATE INDEX idx_devices_cust_house
  ON devices.devices(customer_id, house_id);

DROP TRIGGER IF EXISTS update_devices_updated_at
  ON devices.devices;

CREATE TRIGGER update_devices_updated_at
BEFORE UPDATE ON devices.devices
FOR EACH ROW EXECUTE PROCEDURE devices.update_updated_at_column();


-- 2.53) ตาราง audit logs สำหรับอุปกรณ์
CREATE TABLE devices.device_logs (
  log_id        SERIAL PRIMARY KEY,
  customer_id   INT NOT NULL
        REFERENCES public.customers(customer_id),
  device_id     INTEGER NOT NULL REFERENCES devices.devices(device_id) ON DELETE CASCADE,
  event_type    VARCHAR(50) NOT NULL,   -- e.g. 'config_update','reboot','error'
  event_data    JSONB,
  performed_by  VARCHAR(100),
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- Index ช่วยกรองตาม tenant และ device
CREATE INDEX idx_device_logs_cust_device
  ON devices.device_logs(customer_id, device_id);


-- 2.54) ประวัติสถานะอุปกรณ์
CREATE TABLE devices.device_status_history (
  id            SERIAL PRIMARY KEY,
  customer_id   INT NOT NULL REFERENCES public.customers(customer_id),
  device_id     INTEGER NOT NULL REFERENCES devices.devices(device_id) ON DELETE CASCADE,
  performed_by  VARCHAR(100),
  status        VARCHAR(50)   NOT NULL,
  changed_at    TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
  note          TEXT
);

-- Index ช่วยกรองตาม tenant และ device
CREATE INDEX idx_device_status_history_cust_device
  ON devices.device_status_history(customer_id, device_id);



