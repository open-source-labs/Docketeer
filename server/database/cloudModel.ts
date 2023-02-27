import { Pool } from 'pg';
import { SqlQuery } from '../../types';

const pool = new Pool({
  host: 'localhost',
  user: 'postgres',
  password: 'postgres',
  database: 'docketeer-db',
  port: 5432,
});

const db: SqlQuery = {
  query: (text, params, callback) => {
    console.log('Executed Docketeer query...', text);
    return pool.query(text, params, callback);
  },
};

export default db;
