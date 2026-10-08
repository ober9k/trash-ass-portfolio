import { getHistoricPrices, getLatestPrices } from "@/apis/prices";
import { seedRoutes } from "@/helpers/seedRoutes";
import { assetsRoutes } from "@/routes/assetsRoutes";
import { meTransactionsRoutes } from "@/routes/meTransactionsRoutes";
import { getHoldingByTicker, getHoldings, getHoldingTransactionsByTicker, getPortfolio } from "@/services";
import type { Currency } from "@shared/types/currency";
import { Period } from "@shared/types/period";
import type { Asset } from "@shared/types/portfolio";
import cors from "cors";
import express, { type Express, type Request, type Response } from "express";
import { mapQuotedAsset } from "../utils/apiUtils";
import { StatusCodes } from "http-status-codes";
import { addTransaction } from "./apis/transactions";
import { transactionSchemaValidationHandler } from "./middlewares/validators/schemaValidators";
import { fetchAssetByTicker } from "./apis/assets";
import { holdingsRoutes } from "./routes/holdingsRoutes";

const app: Express = express();

const allowedOrigins = [
  "http://localhost:4200", /* angular */
  "http://localhost:5173", /* react */
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

app.use(express.json());

/**
 * List current value of user's portfolio.
 */
app.get("/api/me/portfolio", async (req: Request, res: Response) => {
  const period = req.query.period; // this needs to be validated

  res.status(200).json(
    await getPortfolio(period as Period),
  );
});

/**
 * List all of current user's holdings.
 */
app.get("/api/me/portfolio/holdings", async (req: Request, res: Response) => {
  const period = req.query.period; // this needs to be validated

  res.status(200).json(
    await getHoldings(period as Period),
  );
});

/**
 * List all of current user's holdings by ticker.
 */
app.get("/api/me/portfolio/holdings/:ticker", async (req: Request, res: Response) => {
  /* validate tokenId/symbol */
  const ticker = req.params.ticker as string;

  res.status(200).json(
    await getHoldingByTicker(ticker),
  );
});

app.post("/api/me/portfolio/holdings/:ticker/transactions", [transactionSchemaValidationHandler()], async (req: Request, res: Response) => {
  const { type, price, quantity, fee, value } = req.body;
  const ticker = req.params["ticker"] as string;

  const asset = await fetchAssetByTicker(ticker.toUpperCase());
  const accountId = "axRTt0eEZDgznMzU1Mawr6fYsjq2"; // ober9k
  const assetId = asset.id;

  console.log("asset", asset);
  console.log("data", {accountId, assetId, type, price, quantity, fee, value});

  return res.status(StatusCodes.OK).json(
    {},
  );
});

app.use("/api/assets", assetsRoutes);
app.use("/api/me/holdings", holdingsRoutes);
app.use("/api/me/transactions", meTransactionsRoutes);
app.use("/api/seed", seedRoutes);

export default app;
