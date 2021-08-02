/**
 * ************************************
 *
 * @module psqlQuery
 * @author Brent Speight, Emma Czech, May Li, Ricardo Cortez
 * @date 08/02/2021
 * @description Creates pool to connect application with docketeer-db container, exports function to facilitate database queries
 *
 * ************************************
 */

const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost', 
  user: 'postgres',
  password: 'postgres',
  database: 'docketeer-db',
  port: 5432,
});

export default async (text, params, callback) => {
  const rows = await pool.query(text, params, callback);
  return rows;
};
