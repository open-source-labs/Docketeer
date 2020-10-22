CREATE TABLE metrics (
  id SERIAL PRIMARY KEY,
  container_id TEXT,
  container_name TEXT,
  cpu_pct TEXT,
  memory_pct TEXT,
  memory_usage TEXT,
  net_io TEXT,
  block_io TEXT,
  pid TEXT
);

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username TEXT,
  phone_number INTEGER
);