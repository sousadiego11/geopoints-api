import pgPromise from 'pg-promise';

require('dotenv').config();

const {
  DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME,
} = process.env;

const pgp = pgPromise({});
const connectionString = `postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;

export const db = pgp(connectionString);
