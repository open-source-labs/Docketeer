/**
 * ************************************
 *
 * @module Cloud Database Model
 * @author Brent Speight, Emma Czech, May Li, Ricardo Cortez
 * @date 08/02/2021
 * @description Creates pool to connect application with elephantSQL cloud database that contains persisted user information, exports function used to query database
 *
 * ************************************
 */

const { Pool } = require('pg');
const { config } = require('dotenv');

config();

// Note: no need to create any tables, upon start up Docketeer will create those tables in your DB instance automatically.
const cloudPool = new Pool({
  connectionString: process.env.POSTGRES_URI,
});

module.exports = {
  query: function (text, params, callback) {
    console.log('executed cloud query', text);
    return cloudPool.query(text, params, callback);
  },
};
