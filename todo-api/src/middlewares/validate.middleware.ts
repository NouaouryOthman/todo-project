import { Request, Response, NextFunction } from "express";
import { AnyObjectSchema } from "yup";
import { BadRequest } from "http-errors";

export const validate =
  (schema: AnyObjectSchema, target: "body" | "params" | "query" = "body") =>
  async (req: Request, _: Response, next: NextFunction): Promise<void> => {
    try {
      req[target] = schema.validateSync(req[target], {
        abortEarly: false,
        stripUnknown: true,
      });
      next();
    } catch (err: any) {
      throw BadRequest(
        JSON.stringify({
          message: `Invalid ${target}`,
          errors: err.errors,
        })
      );
    }
  };
