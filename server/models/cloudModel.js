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
require('dotenv').config();

// Connects to database. 
// Note: no need to create any tables, upon start up Docketeer will create those tables in your DB instance automatically.

const PG_URI = `${process.env.PG_URI}`;

const cloudPool = new Pool({
  connectionString: PG_URI,
});

module.exports = {
  query: function (text, params, callback) {
    console.log('Executed query...', text);
    return cloudPool.query(text, params, callback);
  },
};
