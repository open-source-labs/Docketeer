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

const WRITE_USER = `
  INSERT INTO userinformation (username, phone_number)
  VALUES ($1, $2)
  RETURNING *;
`;

module.exports={
  WRITE_USER,
  WRITE_METRICS,
  GET_METRICS
};