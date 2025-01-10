import pgPromise from "pg-promise";
import { config } from "dotenv";

config();

const pgp = pgPromise();
const db = pgp({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
})

export default db;
