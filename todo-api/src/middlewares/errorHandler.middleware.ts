import { NextFunction, Request, Response } from "express";
import { HttpError } from "http-errors";

export const errorHandler = (
  error: Error | HttpError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if ("statusCode" in error)
    res
      .status(error.status)
      .json({ status: error.status, message: error.message });
  else
    res.status(500).json({
      status: 500,
      message: "Internal server error.",
      stack: process.env["NODE_ENV"] === "local" ? error.stack : undefined,
    });
};
