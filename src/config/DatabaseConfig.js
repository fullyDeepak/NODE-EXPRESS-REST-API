import mongoose from "mongoose";
import { createPool } from "mysql2";
import logger from "../api/helpers/logger.js";
import pg from "pg";

// connect and export MySQL database
const connectionPool = createPool(process.env["MYSQL_URI"]);
const promisePool = connectionPool.promise();
export const mysqlConnectionPool = promisePool;

// connect and export PostgreSQL database
const { Pool } = pg;
const postgresConnectionPool = new Pool({
  database: process.env["PG_DATABASE_NAME"],
  host: process.env["PG_DATABASE_HOST"],
  user: postgres,
  password: process.env["PG_DATABASE_PASSWORD"],
  port: 5432,
  ssl: {
    rejectUnauthorized: false,
  },
});
postgresConnectionPool.on("connect", () => {
  console.log("Creating a client to the postgres db");
});

export function gePGDBClient() {
  return postgresConnectionPool;
}

// connect and export MongoDB database
export const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env["MONGO_DB_URI"]);
    logger.info("Connected to MongoDB database!!!");
  } catch (error) {
    logger.error("MongoDB connection error", error);
    process.exit(1);
  }
};
