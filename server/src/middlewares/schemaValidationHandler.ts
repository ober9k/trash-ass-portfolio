import type { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { z } from "zod";

export function schemaValidationHandler(schema: z.ZodType) {
  return function (
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      schema.parse(req.body);
      return next();
    }
    catch (error) {
      if (error instanceof z.ZodError) {
        return res
          .status(StatusCodes.UNPROCESSABLE_ENTITY)
          .json({
            message: "Validation Failed.",
            errors: z.flattenError(error),
          });
      }
      return next(error);
    }
  }
}
