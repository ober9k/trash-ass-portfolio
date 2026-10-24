import { seedRoutes } from "@/helpers/seedRoutes";
import { errorHandler } from "@/middlewares/errorHandler";
import { assetsRoutes } from "@/routes/assetsRoutes";
import { portfolioRoutes } from "@/routes/portfolioRoutes";
import cors from "cors";
import express, { type Express } from "express";
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


  return res.status(200).json(
    data,
app.use("/api/assets", assetsRoutes);
app.use("/api/me/portfolio", portfolioRoutes);
app.use("/api/me/holdings", holdingsRoutes);
app.use("/api/seed", seedRoutes);

/* init error handler (last) */
app.use(errorHandler);

export default app;
