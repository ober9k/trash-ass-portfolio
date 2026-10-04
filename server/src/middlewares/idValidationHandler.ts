import type { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

function isValidId(id: string): boolean {
  const regex = /^[a-zA-Z0-9_-]{20}$/;
  return regex.test(id);
}

export function idValidationHandler(key: string) {
  return function (
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const id = req.params[key] as string;

    if (!isValidId(id)) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ code: StatusCodes.BAD_REQUEST, message: `Provided \`${key}\` is not valid.` });
    }

    return next();
  }
}
