import dotenv from 'dotenv';
dotenv.config();

export const POSTGRES_NAME = process.env.DB_NAME
  ? process.env.DB_CONTAINER_NAME
  : 'docketeer-db';

export const POSTGRES_USER = process.env.DB_USER
  ? process.env.DB_USER
  : 'postgres';
export const POSTGRES_PASS = process.env.DB_PASS
  ? process.env.DB_PASS
  : 'postgres';
export const POSTGRES_SERVICE = process.env.DB_SERVICE_NAME
  ? process.env.DB_SERVICE_NAME
  : 'db';
export const JWT_SECRET = process.env.JWT_SECRET
  ? process.env.JWT_SECRET
  : 'fced686ad3297c774a7c635cc3d7d33421ec0f557fda29510c6c8b7a95736dc36da9064e1fa6963f0069a29a9c1a62d799ce667dece4f3aafe9449aaed2b2302';

export const DASHBOARD_PORT = process.env.REACT_DASHBOARD_PORT
  ? Number(process.env.DASHBOARD_PORT)
  : 2999;
export const DASHBOARD_UID = process.env.REACT_REACT_DASHBOARD_ORG_ID
  ? Number(process.env.DASHBOARD_ORG_ID)
  : 1;
