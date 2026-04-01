import dotenv from "dotenv";
dotenv.config(); // load environment variables first

import express, { Express } from "express";
import cors from "cors";
import morgan from "morgan";

// Configs
import setupSwagger from "../config/swagger";
import { getHelmetConfig } from "../config/helmetConfig";
import { getCorsOptions } from "../config/corsConfig";

// Routes
import router from "../src/api/v1/routes/eventRoutes";

// Initialize Express app
const app: Express = express();

// Middleware
app.use(morgan("combined")); // log first
app.use(cors(getCorsOptions()));
app.use(getHelmetConfig());
app.use(express.json());

// Health check
app.get("/api/v1/health", (_req, res) => {
  res.json({
    status: "OK",
    uptime: process.uptime(),
    timeStamp: new Date().toISOString(),
    version: "1.0.0",
  });
});

// Routes
app.get("/", (_req, res) => res.send("Hello, world!"));
app.use("/api/v1", router);

// Swagger
setupSwagger(app);

export default app;