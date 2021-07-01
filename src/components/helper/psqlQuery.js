/**
 * ************************************
 *
 * @module psqlQuery
 * @author Catherine Larcheveque, Lorenzo Guevara, Charles Ryu, Griffin Silver, Alex Smith
 * @date 6/14/2021
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
