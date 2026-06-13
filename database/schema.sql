CREATE TABLE IF NOT EXISTS app_records (
  id TEXT PRIMARY KEY,
  kind TEXT NOT NULL,
  data JSONB NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS app_records_kind_created_idx
  ON app_records (kind, created_at DESC);
