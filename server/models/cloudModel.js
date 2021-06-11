const { Pool } = require('pg');

const PG_URI = 'postgres://xttcmwad:l_TsGQzJ02tn6aM7fQJTp1TyjbKT5k6i@kashin.db.elephantsql.com/xttcmwad';

const cloudPool = new Pool({
  connectionString: PG_URI,
});

module.exports = (text, params, callback) => {
  console.log('executed cloud query', text);
  return cloudPool.query(text, params, callback);
};