import dotenv from 'dotenv';
dotenv.config();

export const POSTGRES_HOST = process.env.POSTGRES_HOST
  ? process.env.POSTGRES_HOST
  : 'localhost';
export const POSTGRES_NAME = process.env.POSTGRES_NAME
  ? process.env.POSTGRES_NAME
  : 'docketeer-db';
export const POSTGRES_PORT = process.env.POSTGRES_PORT
  ? Number(process.env.POSTGRES_PORT)
  : 5432;
export const POSTGRES_USER = process.env.POSTGRES_USER
  ? process.env.POSTGRES_USER
  : 'postgres';
export const POSTGRES_PASS = process.env.POSTGRES_PASS
  ? process.env.POSTGRES_PASS
  : 'postgres';
export const POSTGRES_SERVICE = process.env.POSTGRES_NAME
  ? process.env.POSTGRES_NAME
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
