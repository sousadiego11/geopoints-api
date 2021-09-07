import { Pool } from 'pg';

require('dotenv').config();

const {
  DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME,
} = process.env;

const connectionString = `postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;
const pool = new Pool({ connectionString });

export { pool };
