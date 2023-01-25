/** 
 *  This Pool initializes the users database. This database is populated on startup, so no need to create tables. (schema2.sql)
 */
import { Pool } from 'pg';
import { SqlQuery } from '../../types';
import * as dotenv from 'dotenv';

dotenv.config();

const PG_URI = process.env.POSTGRES_URI;

const cloudPool: Pool = new Pool({
  connectionString: PG_URI
});

const db: SqlQuery = {
  query: (text, params, callback) => {
    console.log('Executed query...', text);
    return cloudPool.query(text, params, callback);
  }
};

export default db;