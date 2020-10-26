import { Pool } from "pg";

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "postgres",
  database: "docketeerdb",
  port: 5432,
});

export default async (text, params, callback) => {
  let rows = await pool.query(text, params, callback);
  console.log(rows);
  return rows;
};
