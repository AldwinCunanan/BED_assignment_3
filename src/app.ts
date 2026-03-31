import express, { Express } from "express";
//import helmet from "helmet";
import dotenv from "dotenv";

// load environment variables
dotenv.config();

import morgan from "morgan";
import router from "../src/api/v1/routes/eventRoutes"
import setupSwagger from "../config/swagger"
import {getHelmetConfig} from "../config/helmetConfig"
 
// Initialize Express application
const app: Express = express();
app.use(getHelmetConfig());
app.use(express.json());
 
// Initialize morgan
app.use(morgan("combined"));
 
// Define a route
app.get("/", (req, res) => {
    res.send("Hello, world!");
});

app.use("/api/v1", router);

// Health check
app.get("/api/v1/health", (_req, res): void => {
    res.json({
        status: "OK",
        uptime: process.uptime(),
        timeStamp: new Date().toISOString(),
        version: "1.0.0",
    });
});
 
// setup swagger 
setupSwagger(app);
export default app;