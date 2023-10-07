import pg from 'pg';

const config: pg.PoolConfig = {
  user: 'admin',
  password: 'admin',
  database: 'docketeer',
  host: 'postgres',
  port: 5432
}

const pool = new pg.Pool(config);

export default pool;