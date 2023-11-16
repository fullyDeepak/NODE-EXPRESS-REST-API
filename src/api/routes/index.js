import { Router, json } from "express";
import expressWinston from "express-winston";
import { format, transports } from "winston";
import healthCheckRouter from "./healthCheck.helper.js";
const router = Router();

// middlewares
router.use(json());
router.use(
  expressWinston.logger({
    transports: [
      new transports.Console(),
      new transports.File({ filename: "error.log", level: "error" }),
      new transports.File({ filename: "run.log" }),
    ],
    format: format.combine(
      format.colorize(),
      format.json(),
      format.prettyPrint()
    ),
    expressFormat: true,
  })
);

// additonal routers go here
router.use(healthCheckRouter);

router.use(
  expressWinston.errorLogger({
    transports: [new transports.Console()],
    format: format.combine(format.colorize(), format.json()),
  })
);

export default router;
