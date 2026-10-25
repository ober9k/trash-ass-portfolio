import { dbCreateAsset, dbDeleteAsset, dbUpdateAsset, fetchAsset, fetchAssets } from "@/services/assetsService";
import { type AssetData } from "@shared/schemas/assetSchema";
import { type Request, type Response } from "express";
import { StatusCodes } from "http-status-codes/build/cjs/status-codes";

const disableCreate = true; /* we don't need for now */
const disableUpdate = true; /* we don't need for now */
const disableDelete = true; /* we don't need for now */

function getAssetId(req: Request): string {
  return req.params["assetId"] as string;
}

export async function getAssets(req: Request, res: Response) {
  return res.status(StatusCodes.OK).json(
    await fetchAssets(),
  );
}

export async function getAsset(req: Request, res: Response) {
  const assetId = getAssetId(req);

  return res.status(StatusCodes.CREATED).json(
    await fetchAsset(assetId),
  );
}

export async function createAsset(req: Request, res: Response) {
  const { name, website } = req.body as AssetData;

  if (disableCreate) {
    return res.status(StatusCodes.FORBIDDEN).json("Forbidden!");
  }

  return res.status(StatusCodes.OK).json(
    await dbCreateAsset({ name, website }),
  );
}

export async function updateAsset(req: Request, res: Response) {
  const assetId = getAssetId(req);
  const { name, website } = req.body as AssetData;

  if (disableUpdate) {
    return res.status(StatusCodes.FORBIDDEN).json("Forbidden!");
  }

  return res.status(StatusCodes.OK).json(
    await dbUpdateAsset(assetId, { name, website }),
  );
}

export async function deleteAsset(req: Request, res: Response) {
  const assetId = getAssetId(req);

  if (disableDelete) {
    return res.status(StatusCodes.FORBIDDEN).json("Forbidden!");
  }

  return res.status(StatusCodes.OK).json(
    await dbDeleteAsset(assetId),
  );
}
