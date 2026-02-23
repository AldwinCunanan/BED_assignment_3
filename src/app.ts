
import express, { Express } from "express";
import morgan from "morgan";
import router from "../src/api/v1/routes/eventRoutes"
 
// Initialize Express application
const app: Express = express();

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
 
app.post("/test", (req, res) => {
  console.log("TEST BODY:", req.body);
  res.json(req.body);
});
// export app and server for testing
export default app;
 
