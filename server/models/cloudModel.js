const { Pool } = require('pg');

const PG_URI = 'postgres://rfrfjqki:n_e0IG_iOdeazv5etzaJ7_SH9lmTzXDM@kashin.db.elephantsql.com/rfrfjqki';

const cloudPool = new Pool({ 
  connectionString: PG_URI,
});

module.exports = {
  query: function (text, params, callback) {
    console.log('executed cloud query', text);
    return cloudPool.query(text, params, callback);
  }
};