-- FSR Hub — Cloudflare D1 schema
-- Run: wrangler d1 execute fsr-db --file=schema.sql

CREATE TABLE IF NOT EXISTS loads (
  id           TEXT PRIMARY KEY,
  from_city    TEXT NOT NULL,
  to_city      TEXT NOT NULL,
  weight       TEXT,
  truck_type   TEXT,
  load_date    TEXT,
  cargo_type   TEXT,
  price        TEXT,
  status       TEXT DEFAULT 'open',   -- open | accepted | done | cancelled
  shipper_tg_id TEXT,
  shipper_name TEXT,
  carrier_tg_id TEXT,
  carrier_name TEXT,
  created_at   TEXT NOT NULL,
  plt_trace    TEXT                   -- PLT JSON: nullo, psi, v_trace, h_inject
);

CREATE INDEX IF NOT EXISTS idx_loads_status ON loads(status);
CREATE INDEX IF NOT EXISTS idx_loads_shipper ON loads(shipper_tg_id);
CREATE INDEX IF NOT EXISTS idx_loads_route ON loads(from_city, to_city);
CREATE INDEX IF NOT EXISTS idx_loads_created ON loads(created_at DESC);
