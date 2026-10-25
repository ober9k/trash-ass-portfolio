import { dbCreateExchange, dbDeleteExchange, dbFetchExchange, dbFetchExchanges, dbUpdateExchange } from "@/services/exchangesService";
import { type ExchangeData } from "@shared/schemas/exchangeSchema";
import { type Request, type Response } from "express";
import { StatusCodes } from "http-status-codes/build/cjs/status-codes";

const disableCreate = true; /* we don't need for now */
const disableUpdate = true; /* we don't need for now */
const disableDelete = true; /* we don't need for now */

function getExchangeId(req: Request): string {
  return req.params["exchangeId"] as string;
}

export async function getExchanges(req: Request, res: Response) {
  return res.status(StatusCodes.OK).json(
    await dbFetchExchanges(),
  );
}

export async function getExchange(req: Request, res: Response) {
  const exchangeId = getExchangeId(req);

  return res.status(StatusCodes.CREATED).json(
    await dbFetchExchange(exchangeId),
  );
}

export async function createExchange(req: Request, res: Response) {
  const { name, website } = req.body as ExchangeData;

  if (disableCreate) {
    return res.status(StatusCodes.FORBIDDEN).json("Forbidden!");
  }

  return res.status(StatusCodes.OK).json(
    await dbCreateExchange({ name, website }),
  );
}

export async function updateExchange(req: Request, res: Response) {
  const exchangeId = getExchangeId(req);
  const { name, website } = req.body as ExchangeData;

  if (disableUpdate) {
    return res.status(StatusCodes.FORBIDDEN).json("Forbidden!");
  }

  return res.status(StatusCodes.OK).json(
    await dbUpdateExchange(exchangeId, { name, website }),
  );
}

export async function deleteExchange(req: Request, res: Response) {
  const exchangeId = getExchangeId(req);

  if (disableDelete) {
    return res.status(StatusCodes.FORBIDDEN).json("Forbidden!");
  }

  return res.status(StatusCodes.OK).json(
    await dbDeleteExchange(exchangeId),
  );
}
