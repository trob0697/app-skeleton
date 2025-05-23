import { getAuth } from "@clerk/express";
import { NextFunction, Request, Response } from "express";

export function clerkAuth(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const { userId } = getAuth(request);
  if (!userId) {
    response.status(401).json({ error: "Unauthorized" });
    return;
  }
  request.userId = userId;
  return next();
}
