const { Pool } = require("pg");

const PG_URI =
  'postgres://iantsjub:JOVo9S8diTeALh2foS2Kjk9HGBoUUAnY@kashin.db.elephantsql.com/iantsjub';

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "postgres",
  database: "docketeer-db",
  port: 5432,
});

const cloudPool = new Pool({
  connectionString: PG_URI,
});

const cloudQuery = (text, params, callback) => {
  console.log('executed cloud query', text);
  return cloudPool.query(text, params, callback);
}

// cloudQuery('SELECT * FROM account').then((data) => {
//   console.log(data);
// });

export default async (text, params, callback) => {
  let rows = await pool.query(text, params, callback);
  return rows;
};
