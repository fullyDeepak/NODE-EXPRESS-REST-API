import { parse } from "dotenv";
import { readFileSync } from "fs";
import { resolve } from "path";
import process from "process";
import logger from "../helpers/logger.js";

export default function check() {
  const envExample = parse(
    readFileSync(resolve(process.cwd(), ".env.example")),
  );
  let isValid = true;
  for (const env in envExample) {
    // logger.debug("validating", env);
    try {
      if (env === "NODE_ENV") {
        continue;
      }
      if (process.env[env] && process.env[env] != "") {
        // logger.debug(env, "-", process.env[env]);
        continue;
      } else {
        throw new Error(
          `No Such environment variable found but is needed: ${env}`,
        );
      }
    } catch (e) {
      logger.error(e.message);
      isValid = false;
    }
  }
  return isValid;
}
