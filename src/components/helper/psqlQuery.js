const { Pool } = require("pg");

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "postgres",
  database: "docketeer-db",
  port: 5432,
});

export default async (text, params, callback) => {
  let rows = await pool.query(text, params, callback);
  return rows;
};
