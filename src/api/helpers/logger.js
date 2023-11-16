import { createLogger, format, transports } from "winston";
const logger = createLogger({
  level: "info",
  format: format.combine(
    format.splat(),
    format.json({
      maximumDepth: 5,
      bigint: true,
    }),
  ),
  transports: [
    new transports.File({ filename: "error.log", level: "error" }),
    new transports.File({ filename: "run.log" }),
  ],
});
if (process.env.NODE_ENV !== "PRODUCTION") {
  logger.add(
    new transports.Console({
      format: format.combine(format.colorize(), format.simple()),
    }),
  );
}

export default logger;
