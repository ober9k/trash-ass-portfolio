import { seedTransactions } from "@/apis/helpers";
import { getHistoricPrices, getLatestPrices } from "@/apis/prices";
import { getHoldingByTicker, getHoldings, getHoldingTransactionsByTicker, getPortfolio } from "@/services";
import type { Currency } from "@shared/types/currency";
import { Period } from "@shared/types/period";
import type { Asset } from "@shared/types/portfolio";
import cors from "cors";
import express, { type Express, type Request, type Response } from "express";
import { mapQuotedAsset } from "../utils/apiUtils";

const app: Express = express();

const allowedOrigins = [
  "http://localhost:4200", /* angular */
  "http://localhost:5173", /* react */
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

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

/**
 * List all of current user's transactions by tokenId.
 */
app.get("/api/me/portfolio/holdings/:ticker/transactions", async (req: Request, res: Response) => {
  /* validate tokenId/symbol */
  const ticker = req.params.ticker as string;

  res.status(200).json(
    await getHoldingTransactionsByTicker(ticker),
  );
});

app.get("/api/me/seed", async (req: Request, res: Response) => {
  res.status(200).json(
    await seedTransactions(),
  );
});

export default app;
