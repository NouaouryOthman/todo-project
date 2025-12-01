import { describe, it, expect, vi, beforeEach } from "vitest";
import { Request, Response, NextFunction } from "express";
import { HttpError } from "http-errors";
import { errorHandler } from "../errorHandler.middleware";

describe("errorHandler middleware", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = {};

    res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    };

    next = vi.fn();
  });

  it("should handle HttpError with status", () => {
    const error = {
      name: "NotFoundError",
      message: "Not found",
      status: 404,
      statusCode: 404,
    } as HttpError;

    errorHandler(error, req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      status: 404,
      message: "Not found",
    });
  });

  it("should handle generic error and return 500", () => {
    const error = new Error("Something went wrong");

    process.env["NODE_ENV"] = "production";
    errorHandler(error, req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      status: 500,
      message: "Internal server error.",
      stack: undefined,
    });
  });

  it("should include stack trace in local environment", () => {
    const error = new Error("Unexpected failure");

    process.env["NODE_ENV"] = "local";
    errorHandler(error, req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      status: 500,
      message: "Internal server error.",
      stack: error.stack,
    });
  });
});
