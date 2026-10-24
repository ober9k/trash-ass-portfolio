import { errorHandler } from "@/middlewares/errorHandler";
import { assetsRoutes } from "@/routes/assetsRoutes";
import { exchangesRoutes } from "@/routes/exchangesRoutes";
import { meRoutes } from "@/routes/meRoutes";
import { seedRoutes } from "@/routes/seedRoutes";
import { Firestore } from "@google-cloud/firestore";
import cors from "cors";
import express, { type Express } from "express";

const app: Express = express();

Firestore.name; /* hack: leave in for types (for now) */

const allowedOrigins = [
  "http://localhost:4200", /* angular */
  "http://localhost:5173", /* react */
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

app.use(express.json());

app.use("/api/assets", assetsRoutes);
app.use("/api/exchanges", exchangesRoutes);
app.use("/api/me", meRoutes);
app.use("/api/seed", seedRoutes);

/* init error handler (last) */
app.use(errorHandler);

export default app;
