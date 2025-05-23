import express from "express";

import * as UsersDAO from "../db/dao/users";
import { controller } from "../utils/controller";

export const router = express.Router();

//////////////////////////////////////////////////
///// ROUTES

router.get("", getController());

//////////////////////////////////////////////////
///// CONTROLLERS

function getController() {
  return controller({}, async ({ txn, request }) => {
    const user = await UsersDAO.getById(txn, {
      id: request.userId!,
    });
    return { body: user };
  });
}
