/**
 * @description PSQL Queries
 */

const GET_METRICS = `
  SELECT * 
  FROM metrics WHERE container_name = $1;
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

// export const INSERT_USER = `
//   INSERT INTO users (username, phone_number, notification_frequency, monitoring_frequency)
//   VALUES ($1, $2, $3, $4)
//   ON CONFLICT ON CONSTRAINT unique_username
//   DO
//     UPDATE SET phone_number = $2;  
// `;

export const GET_PHONE_NUMBER = `
  SELECT phone_number
  FROM users 
  WHERE username = $1;
`;

export const GET_CONTAINERS = `
SELECT *
FROM containers;
`

// export const GET_NOTIFICATION_SETTINGS = `
//   SELECT cs.container_id, metric_name, triggering_value
//   FROM container_settings cs
//   INNER JOIN notification_settings ns ON cs.notification_settings_id = ns.id;
// `;

// export const INSERT_CONTAINER_SETTING = `  
//   INSERT INTO container_settings (container_id, notification_settings_id)  
//   SELECT $1, id 
//   FROM notification_settings 
//   WHERE metric_name = $2;    
//   `;

// export const INSERT_CONTAINER = `
//   INSERT INTO containers(id, name)
//   VALUES ($1, $2)
//   ON CONFLICT (id)
//   DO NOTHING;
// `;

// export const DELETE_CONTAINER_SETTING = `
//   DELETE FROM container_settings
//   WHERE container_id = $1 and notification_settings_id = (SELECT id FROM notification_settings where metric_name = $2);
// `;

// export const INSERT_NOTIFICATION_FREQUENCY = `  
//   INSERT INTO users (username, phone_number, notification_frequency, monitoring_frequency)
//   VALUES ($1, $2, $3, $4)
//   ON CONFLICT ON CONSTRAINT unique_username
//   DO
//     UPDATE SET notification_frequency = $3;  
// `;

// export const INSERT_MONITORING_FREQUENCY = `  
//   INSERT INTO users (username, phone_number, notification_frequency, monitoring_frequency)
//   VALUES ($1, $2, $3, $4)
//   ON CONFLICT ON CONSTRAINT unique_username
//   DO
//     UPDATE SET monitoring_frequency = $4;  
// `;

// export const INSERT_GITHUB = `  
//   INSERT INTO containers (id, name, github_url)
//   VALUES ($1, $2, $3)
//   ON CONFLICT ON CONSTRAINT unique_id
//   DO
//     UPDATE SET github_url = $3;
// `;