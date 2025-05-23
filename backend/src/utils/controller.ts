import { ExtractTablesWithRelations } from "drizzle-orm";
import { NodePgQueryResultHKT, drizzle } from "drizzle-orm/node-postgres";
import { PgTransaction } from "drizzle-orm/pg-core";
import { CookieOptions, Request, RequestHandler, Response } from "express";
import * as J from "joi";
import { Pool } from "pg";
import Joi from "types-joi";

import * as Logger from "../utils/logger";

const db = drizzle(
  new Pool({
    connectionString: process.env.DATABASE_URL!,
    max: 10,
    connectionTimeoutMillis: 5000,
    idleTimeoutMillis: 30000,
  }),
);
const logger = Logger.logger;

interface Schema<TParams, TQuery, TBody> {
  params?: Joi.AnySchema<TParams | undefined>;
  query?: Joi.AnySchema<TQuery | undefined>;
  body?: Joi.AnySchema<TBody | undefined>;
}

interface HandlerArguments<TParams, TQuery, TBody> {
  txn: PgTransaction<
    NodePgQueryResultHKT,
    Record<string, never>,
    ExtractTablesWithRelations<Record<string, never>>
  >;
  request: Request;
  response: Response;
  params: NonNullable<TParams>;
  query: NonNullable<TQuery>;
  body: NonNullable<TBody>;
}

interface Cookie {
  key: string;
  value: string;
  options: CookieOptions;
}

interface HandlerResponse {
  status?: number;
  cookies?: Cookie[];
  body?: object;
  buffer?: Buffer;
  redirect?: string;
  call?: string;
}

export function controller<
  TParams,
  TQuery,
  TBody,
  TResponse extends HandlerResponse,
>(
  schema: Schema<TParams, TQuery, TBody>,
  handlerFunction: (
    args: HandlerArguments<TParams, TQuery, TBody>,
  ) => Promise<TResponse>,
): RequestHandler {
  return async (request, response, next) => {
    try {
      const params: NonNullable<TParams> =
        schema.params !== undefined
          ? Joi.attempt(
              request.params,
              schema.params.required().strict(true),
              "Parameters do not match schema",
            )
          : (request.params as any); // eslint-disable-line @typescript-eslint/no-explicit-any
      const query: NonNullable<TQuery> =
        schema.query !== undefined
          ? Joi.attempt(
              request.query,
              schema.query.required(),
              "Query does not match schema",
            )
          : (request.query as any); // eslint-disable-line @typescript-eslint/no-explicit-any
      const body: NonNullable<TBody> =
        schema.body !== undefined
          ? Joi.attempt(
              request.body,
              schema.body.required().strict(true),
              "Body does not match schema",
            )
          : request.body;

      const res = await db.transaction(async (txn) => {
        return await handlerFunction({
          txn,
          request,
          response,
          body,
          params,
          query,
        });
      });

      if (
        [res.body, res.buffer, res.redirect, res.call].filter(
          (ele) => ele !== undefined,
        ).length !== 1
      ) {
        next("Exactly one of body, buffer, or redirect must be returned");
      }

      res.cookies?.forEach((cookie) => {
        response.cookie(cookie.key, cookie.value, cookie.options);
      });

      if (res.body) {
        response.status(res.status || 200).json(res.body);
      } else if (res.buffer) {
        response.status(res.status || 200).send(res.buffer);
      } else if (res.redirect) {
        response.redirect(res.redirect);
      } else if (res.call) {
        response.type("text/xml");
        response.send(res.call);
      }
    } catch (error: unknown) {
      if (error instanceof J.ValidationError) {
        response.status(400).json({
          message: "Validation failed for request",
          details: error.details.map((d) => d.message),
        });
      } else {
        logger.error(
          "Request failed with the following:\n" +
            `\tParams: ${JSON.stringify(request.params)}\n` +
            `\tQuery: ${JSON.stringify(request.query)}\n` +
            `\tBody: ${JSON.stringify(request.body)}\n` +
            `${error instanceof Error ? error.stack : String(error)}`,
        );
        response.status(500).send("Internal Server Error");
      }
      next();
    }
  };
}
