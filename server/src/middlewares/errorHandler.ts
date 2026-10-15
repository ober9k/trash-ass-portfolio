// import { FirestoreError } from "@/models/firestoreError";
import { isHttpException } from "@/models/httpException";
import { type NextFunction, type Request, type Response } from "express";
import { StatusCodes } from "http-status-codes";

/**
 * Borrowed with adjustments, see:
 * https://github.com/gothinkster/node-express-realworld-example-app/
 */
export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (isHttpException(err)) {
    const { code, message } = err;

    // work with the custom handler
    switch (err.code) {
      case StatusCodes.UNAUTHORIZED:
      case StatusCodes.NOT_FOUND:
        return res
          .status(err.code)
          .json({ code, message });
      default:
        return res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ code, message });
    }
  }

  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json(err.message);
}
