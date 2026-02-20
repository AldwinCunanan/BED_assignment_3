
import express, { Express } from "express";
import morgan from "morgan";
 
// Initialize Express application
const app: Express = express();
 
// Initialize morgan
app.use(morgan("combined"));
 
// Define a route
app.get("/", (req, res) => {
    res.send("Hello, world!");
});

// Health check
app.get("/health", (_req, res): void => {
    res.json({
        status: "OK",
        uptime: process.uptime(),
        timeStamp: new Date().toISOString(),
        version: "1.0.0",
    });
});
 
// export app and server for testing
export default app;
 
