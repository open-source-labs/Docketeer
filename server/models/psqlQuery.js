const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost', 
  user: 'postgres',
  password: 'postgres',
  database: 'docketeer-db',
  port: 5433,
});

module.exports = {
  query2: (text, params, callback) => {
    console.log('Executed Docketeer query...', text);
    return pool.query(text, params, callback);
  }
};
