/**
 * PSQL Queries
 */

export const GET_METRICS = `
  SELECT * 
  FROM metrics;
`;

export const WRITE_METRICS = `
  INSERT INTO metrics (container_id, cpu_pct, memory_pct)
  VALUES ($1, $2, $3)
  RETURNING *;
`;
