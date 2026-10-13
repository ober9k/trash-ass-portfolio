import { getHistoricPrices, getLatestPrices } from "@/apis/prices";
import { fetchSummaryIdByAccountIdAndAssetId, updateSummaryData } from "@/apis/summaries";
import { addTransaction, aggregateTransactionsByAccountIdAndAssetId } from "@/apis/transactions";
import { seedRoutes } from "@/helpers/seedRoutes";
import { errorHandler } from "@/middlewares/errorHandler";
import { assetsRoutes } from "@/routes/assetsRoutes";
import { portfolioRoutes } from "@/routes/portfolioRoutes";
import { transactionsRoutes } from "@/routes/transactionsRoutes";
import { Period } from "@shared/types/period";
import cors from "cors";
import express, { type Express, type Request, type Response } from "express";
import { StatusCodes } from "http-status-codes";
import { fetchAssetByTicker } from "./apis/assets";
import { transactionSchemaValidationHandler } from "./middlewares/validators/schemaValidators";
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
app.use("/api/me/portfolio", portfolioRoutes);
app.use("/api/me/holdings", holdingsRoutes);
app.use("/api/me/transactions", transactionsRoutes);
app.use("/api/seed", seedRoutes);

/* init error handler (last) */
app.use(errorHandler);

export default app;
