import HttpException from "@/models/httpException";
import type { Request } from "express";
import { StatusCodes } from "http-status-codes";

/**
 * Attempt to get the user's `userId` (alias of `user_id`) or fail.
 * The expectation is that the request runs through the token authentication.
 */
export function getUserId(req: Request): string {
  if (!req["user"] || !req["user"].user_id) {
    throw new HttpException(StatusCodes.UNAUTHORIZED, "Unauthorized", "Unable to find `userId` for current user.")
  }

  return req["user"].user_id;
}
