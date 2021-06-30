/**
 * ************************************
 *
 * @module Cloud Database Model
 * @author Catherine Larcheveque, Lorenzo Guevara, Charles Ryu, Griffin Silver, Alex Smith
 * @date 6/14/2021
 * @description Creates pool to connect application with elephantSQL cloud database that contains persisted user information, exports function used to query database
 *
 * ************************************
 */

const { Pool } = require('pg');

// const PG_URI = 'postgres://rfrfjqki:n_e0IG_iOdeazv5etzaJ7_SH9lmTzXDM@kashin.db.elephantsql.com/rfrfjqki';

const PG_URI = 'postgres://xttcmwad:l_TsGQzJ02tn6aM7fQJTp1TyjbKT5k6i@kashin.db.elephantsql.com/xttcmwad';

const cloudPool = new Pool({ 
  connectionString: PG_URI,
});

module.exports = {
  query: function (text, params, callback) {
    console.log('executed cloud query', text);
    return cloudPool.query(text, params, callback);
  }
};