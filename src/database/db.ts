import pgPromise from 'pg-promise';

require('dotenv').config();

const {
  DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME,
} = process.env;

const ssl = process.env.NODE_ENV !== 'production' ? false : {
  rejectUnauthorized: false,
};

const pgp = pgPromise({});
const config = {
  host: DB_HOST,
  port: +DB_PORT,
  database: DB_NAME,
  user: DB_USER,
  password: DB_PASSWORD,
  max: 30,
  ssl,
};

export const db = pgp(config);
