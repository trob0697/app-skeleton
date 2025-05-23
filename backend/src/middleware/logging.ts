import { randomUUID } from "crypto";
import { NextFunction, Request, Response } from "express";

import * as Logger from "../utils/logger";

const logger = Logger.logger;

export function logging(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const start = performance.now();
  const path = request.path;
  logger.defaultMeta = { traceId: randomUUID() };
  logger.info(`${request.method} ${path} called`);
  response.on("finish", () => {
    const end = performance.now() - start;
    logger.info(
      `${request.method} ${path} ${response.statusCode} finished in ${end}`,
    );
  });
  return next();
}
