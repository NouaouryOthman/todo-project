import { describe, it, expect, vi, beforeEach } from "vitest";
import { Request, Response } from "express";
import { BadRequest } from "http-errors";
import { validate } from "../validate.middleware";
import { object, string } from "yup";

const bodySchema = object({
  title: string().required(),
  description: string().required(),
});

const paramSchema = object({
  id: string().uuid().required(),
});

describe("validate middleware", () => {
  const mockNext = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should call next() when body is valid", async () => {
    const req = {
      body: {
        title: "test",
        description: "test",
      },
    } as unknown as Request;

    const middleware = validate(bodySchema);

    middleware(req, {} as Response, mockNext);

    expect(req.body).toEqual({ title: "test", description: "test" });
    expect(mockNext).toHaveBeenCalled();
  });

  it("should throw BadRequest when body is invalid", async () => {
    const req = {
      body: {
        title: "test",
      },
    } as unknown as Request;

    const middleware = validate(bodySchema);

    expect(middleware(req, {} as Response, mockNext)).rejects.toThrow(
      BadRequest
    );
  });

  it("should validate params", async () => {
    const req = {
      params: {
        id: "d81e8aad-cce2-470e-85d2-21e3c34a0009",
      },
    } as unknown as Request;

    const middleware = validate(paramSchema, "params");
    middleware(req, {} as Response, mockNext);

    expect(req.params).toEqual({ id: expect.any(String) });
    expect(mockNext).toHaveBeenCalled();
  });

  it("should throw BadRequest when params are invalid", async () => {
    const req = {
      params: {
        id: "not-a-uuid",
      },
    } as unknown as Request;

    const middleware = validate(paramSchema, "params");

    await expect(middleware(req, {} as Response, mockNext)).rejects.toThrow(
      BadRequest
    );
  });
});
