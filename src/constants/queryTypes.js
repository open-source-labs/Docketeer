/**
 * PSQL Queries
 */

const GET_METRICS = `
  SELECT * 
  FROM metrics;
`;

const WRITE_METRICS = `
  INSERT INTO metrics (container_id, cpu_pct, memory_pct)
  VALUES ($1, $2, $3)
  RETURNING *;
`;

export const INSERT_NETWORK = `
  INSERT INTO docker_networks (network_name, file_path)
  VALUES ($1, $2)
  RETURNING *;
`;

export const DELETE_NETWORK = `
  DELETE FROM docker_networks WHERE network_name = $1;
`;

export const INSERT_USER = `
  INSERT INTO users (username, phone_number)
  VALUES ($1, $2)
  RETURNING *;
`;

/* Notification Settings Queries */
export const GET_NOTIFICATION_SETTINGS = `
  SELECT cs.container_id, metric_name, triggering_value
  FROM container_settings cs
  INNER JOIN notification_settings ns ON cs.notification_settings_id = ns.id;
`;

// container id, setting (name and value)
/**
 * params $1 container id, $2 container name, $3 metric name
 */
export const INSERT_CONTAINER_SETTING = `  
  INSERT INTO container_settings (container_id, notification_settings_id)  
  SELECT $1, id 
  FROM notification_settings 
  WHERE metric_name = $2;    
  `;

export const INSERT_CONTAINER = `
  INSERT INTO containers(id, name)
  VALUES ($1, $2)
  ON CONFLICT (id)
  DO NOTHING;
`;

// container id, setting (name and value)
/**
 * params $1 container id, $2 metric name
 */
export const DELETE_CONTAINER_SETTING = `
  DELETE FROM container_settings
  WHERE container_id = $1 and notification_settings_id = (SELECT id FROM notification_settings where metric_name = $2);
`;
