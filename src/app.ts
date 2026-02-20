
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
 
// export app and server for testing
export default app;
 
