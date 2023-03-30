import { Pool } from 'pg';
import { SqlQuery } from '../../types';
import {
  POSTGRES_SERVICE,
  POSTGRES_USER,
  POSTGRES_PASS,
  POSTGRES_NAME,
} from '../../config.js';

const host = POSTGRES_SERVICE;
const user = POSTGRES_USER;
const password = POSTGRES_PASS;
const database = POSTGRES_NAME;
const port = 5432;
const pool = new Pool({
  host,
  user,
  password,
  database,
  port,
});

const db: SqlQuery = {
  query: (text, params, callback) => {
    console.log('Executed Docketeer query...', text);
    return pool.query(text, params, callback);
  },
};

export default db;
