import "dotenv/config";

import { clerkMiddleware } from "@clerk/express";
import cookieParser from "cookie-parser";
import express from "express";

import { clerkAuth } from "./middleware/auth";
import { logging } from "./middleware/logging";
import { router as HealthRouter } from "./routes/health";
import { router as UserRouter } from "./routes/user";

const CLERK_SECRET_KEY = process.env.CLERK_SECRET_KEY!;
const CLERK_PUBLISHABLE_KEY = process.env.CLERK_PUBLISHABLE_KEY!;
const PORT = process.env.PORT || 4000;

const app = express();

app.set("etag", false);
app.use(
  clerkMiddleware({
    secretKey: CLERK_SECRET_KEY,
    publishableKey: CLERK_PUBLISHABLE_KEY,
  }),
);
app.use(logging);
app.use(
  express.json({
    limit: "1mb",
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    verify: (req: any, _res, buf) => {
      req.bodyRaw = buf;
    },
  }),
);
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/health", HealthRouter);
app.use("/user", clerkAuth, UserRouter);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
