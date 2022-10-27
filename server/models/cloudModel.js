/**       Docketeer 7.0
 *  This Pool initializes the users database. This database is populated on startup, so no need to create tables. (schema2.sql)
 */

const { Pool } = require('pg');
require('dotenv').config();

const PG_URI = process.env.POSTGRES_URI;

const cloudPool = new Pool({
  connectionString: PG_URI
});

module.exports = {
  query: (text, params, callback) => {
    // console.log('Executed query...', text);
    return cloudPool.query(text, params, callback);
  }
};
