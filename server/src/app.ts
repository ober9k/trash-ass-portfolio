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

app.get("/api/hello", (req: Request, res: Response) => {
  res.json({ message: "Hello, World!" });
});

export default app;
