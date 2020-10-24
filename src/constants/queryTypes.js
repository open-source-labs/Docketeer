/**
 * PSQL Queries
 */

export const GET_METRICS = `
  SELECT * 
  FROM metrics WHERE container_name = $1;
`;

export const WRITE_METRICS = `
  INSERT INTO metrics (container_id, container_name, cpu_pct, memory_pct)
  VALUES ($1, $2, $3, $4)
  RETURNING *;
`;
