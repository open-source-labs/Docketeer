/**       Docketeer 7.0
 *  This Pool initializes the metrics database. If you get an error that says port is in use, adjust the port number here.
 *  Make sure it matches the port in the docker-compose.yml (schema.sql)
 */

import { Pool } from 'pg';
import { SqlQuery } from '../../types';

const pool = new Pool({
  host: 'localhost',
  user: 'postgres',
  password: 'postgres',
  database: 'docketeer-db',
  port: 5433,
});

const db: SqlQuery = {
  query: (text, params, callback) => {
    console.log('Executed Docketeer query...', text);
    return pool.query(text, params, callback);
  },
};

export default db;
