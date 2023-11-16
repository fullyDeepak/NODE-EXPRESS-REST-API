import * as dotenv from "dotenv";
import validateEnv from "./api/helpers/checkenv.js";
import logger from "./api/helpers/logger.js";
let envFile = ".env";
if (["PRODUCTION", "DEVELOPMENT"].includes(process.env.NODE_ENV)) {
  logger.info(`Loading .env from .env.${process.env.NODE_ENV}`);
  dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
  envFile = `.env.${process.env.NODE_ENV}`;
} else {
  logger.info("Loading .env from .env");
  dotenv.config();
}
const isvalid = validateEnv();
if (!isvalid) {
  logger.error(`COULD NOT VALIDATE ${envFile}`);
  process.kill(1);
} else {
  logger.info(`sucessfully validated ${envFile}`);
}

import express from "express";
const app = express();
import routes from "./api/routes/index.js";
import { connectToMongoDB } from "./config/DatabaseConfig.js";
import cors from "cors";

app.use(cors());
app.use(routes);

connectToMongoDB().catch(console.error);
app.listen(process.env.PORT, () => {
  logger.info("Serving Requests on %s", process.env.PORT);
});
