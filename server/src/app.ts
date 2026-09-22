import { getPortfolio, getPortfolioAssets, getTransactionsByTokenId, getTransactionsSummary } from "@/services";
import { buildPlaceholderMessage } from "@/utils";
import cors from "cors";
import express, { type Express, type Request, type Response } from "express";

const app: Express = express();

const allowedOrigins = [
  "http://localhost:4200", /* angular */
  "http://localhost:5173", /* react */
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

app.get("/hello", (req: Request, res: Response) => {
  res.send("Hello, World!");
});

app.get("/api/hello", /*[isAuthenticated], */(req: Request, res: Response) => {
  res.json({ message: "Hello, World!" });
});

/**
 * List current value of user's portfolio.
 */
app.get("/api/me/portfolio", async (req: Request, res: Response) => {
  res.status(200).json(
    await getPortfolio(),
  );
});

/**
 * Get a summary of the current portfolio
 */
app.get("/api/me/portfolio/summary", async (req: Request, res: Response) => {
  res.status(200).json(
    await getPortfolioSummary(),
  );
});

/**
 * List all of current user's tokens.
 * TODO: improve naming
 */
app.get("/api/me/portfolio/assets", async (req: Request, res: Response) => {
  res.status(200).json(
    await getPortfolioAssets(),
  );
});

/**
 * Add new token/transaction to current user's transactions.
 * This will either create a new entry if the first transaction or add to existing transactions for token.
 */
app.post("/api/me/tokens", (req: Request, res: Response) => {
  return res.json(buildPlaceholderMessage("CREATE me.tokens()"));
});

/**
 * List all of current user's transactions by tokenId.
 */
app.get("/api/me/tokens/:tokenId/transactions", async (req: Request, res: Response) => {
  const tokenId = req.params.tokenId as string;

  /* validate tokenId/symbol */

  res.status(200).json(
    await getTransactionsByTokenId(tokenId),
  );
});

/**
 * Yield a transaction summary for the user's token holdings.
 */
app.get("/api/me/tokens/:tokenId/summary", async (req: Request, res: Response) => {
  const tokenId = req.params.tokenId as string;

  /* validate tokenId/symbol */

  res.status(200).json(
    await getTransactionsSummary(tokenId),
  );
});

/**
 * Add new transaction to current user's transactions by tokenId.
 */
app.post("/api/me/tokens/:tokenId/transactions", (req: Request, res: Response) => {
  return res.json(buildPlaceholderMessage("CREATE me.tokens().by(tokenId).transactions()"));
});

/**
 * Update existing transaction for current user's transactions by tokenId and transactionId.
 */
app.get("/api/me/tokens/:tokenId/transactions/:transactionId/transactions", (req: Request, res: Response) => {
  return res.json(buildPlaceholderMessage("me.tokens().by(tokenId).transactions().byId(transactionId)"));
});

/**
 * Update existing transaction for current user's transactions by tokenId and transactionId.
 */
app.put("/api/me/tokens/:tokenId/transactions/:transactionId/transactions", (req: Request, res: Response) => {
  return res.json(buildPlaceholderMessage("UPDATE me.tokens().by(tokenId).transactions().byId(transactionId)"));
});

export default app;
