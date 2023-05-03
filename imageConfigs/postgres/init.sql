CREATE TABLE users (
    _id SERIAL NOT NULL,
    username VARCHAR (255) UNIQUE NOT NULL,
    password VARCHAR (255) NOT NULL,
  mem_threshold INTEGER DEFAULT 80,
  cpu_threshold INTEGER DEFAULT 80,
  container_stops BOOLEAN DEFAULT true,
  PRIMARY KEY (_id),
) WITH (
  OIDS = FALSE
);

CREATE TABLE metrics (
  id SERIAL PRIMARY KEY,
  container_id TEXT,
  container_name TEXT,
  cpu_pct TEXT,
  memory_pct TEXT,
  memory_usage TEXT,
  net_io TEXT,
  block_io TEXT,
  pid TEXT,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE containers (
  id TEXT PRIMARY KEY,
  name TEXT,
  github_url TEXT,
  CONSTRAINT unique_id UNIQUE(id)
);

-- CREATE TABLE notification_settings (
--   id SERIAL PRIMARY KEY,
--   metric_name TEXT NOT NULL,
--   triggering_value INT,
--   CONSTRAINT unique_name UNIQUE(metric_name)
-- );

CREATE TABLE container_settings (
  container_id TEXT REFERENCES containers(id),
  notification_settings_id INT REFERENCES notification_settings(id),
  CONSTRAINT container_setting PRIMARY KEY(container_id, notification_settings_id)
);
