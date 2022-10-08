const { Pool } = require('pg');
require('dotenv').config();

const PG_URI = process.env.POSTGRES_URI;
// Note: no need to create any tables, upon start up Docketeer will create those tables in your DB instance automatically.

const cloudPool = new Pool({
  connectionString: PG_URI
});

module.exports = {
  query: (text, params, callback) => {
    console.log('Executed query...', text);
    return cloudPool.query(text, params, callback);
  }
};
