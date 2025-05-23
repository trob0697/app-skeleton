import express from "express";

import { controller } from "../utils/controller";
import * as Logger from "../utils/logger";

const logger = Logger.logger;

export const router = express.Router();

//////////////////////////////////////////////////
///// ROUTES

router.get("/", getController());

//////////////////////////////////////////////////
///// CONTROLLERS

function getController() {
  return controller({}, async () => {
    logger.info("Health check has been called");
    return {
      body: { message: "Healthy" },
    };
  });
}
