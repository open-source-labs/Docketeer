CREATE TABLE roles (
  _id SERIAL NOT NULL,
  role VARCHAR (255) NOT NULL,
  PRIMARY KEY (_id)
) WITH (
  OIDS = FALSE
);

CREATE TABLE users (
    _id SERIAL NOT NULL,
    username VARCHAR (255) UNIQUE NOT NULL,
    email VARCHAR (255) NOT NULL,
    password VARCHAR (255) NOT NULL,
  phone VARCHAR (255),
  role VARCHAR (255) DEFAULT 'user',
  role_id INTEGER DEFAULT 3,
  contact_pref VARCHAR (255),
  mem_threshold INTEGER DEFAULT 80,
  cpu_threshold INTEGER DEFAULT 80,
  container_stops BOOLEAN DEFAULT true,
  PRIMARY KEY (_id),
  FOREIGN KEY (role_id) REFERENCES Roles(_id)
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

CREATE TABLE notification_settings (
  id SERIAL PRIMARY KEY,
  metric_name TEXT NOT NULL,
  triggering_value INT,
  CONSTRAINT unique_name UNIQUE(metric_name)
);

CREATE TABLE container_settings (
  container_id TEXT REFERENCES containers(id),
  notification_settings_id INT REFERENCES notification_settings(id),
  CONSTRAINT container_setting PRIMARY KEY(container_id, notification_settings_id)
);

INSERT INTO notification_settings (metric_name, triggering_value) VALUES
('memory', 80),
('cpu', 80),
('stopped', 0);

INSERT INTO roles (role) VALUES ('system admin');
INSERT INTO roles (role) VALUES ('admin')
INSERT INTO roles (role) VALUES ('user')
