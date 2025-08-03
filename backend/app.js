import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import wishRoutes from "./routes/wish.routes.js"; // Make sure this import path is correct

dotenv.config();

const app = express();

connectDB();

app.use(cors({
  origin: 'http://localhost:5173', // Your frontend URL
}));
app.use(express.json());

// Only use the wish routes
app.use("/api/wishes", wishRoutes); // Changed from "/api/wish" to "/api/wishes" for better REST convention

// Optional: Basic root route
app.get("/", (req, res) => {
  res.send("Wish API is running");
});

export default app;