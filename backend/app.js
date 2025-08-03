import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import wishRoutes from "./routes/wish.routes.js"; 

dotenv.config();

const app = express();

await connectDB();

app.use(cors({
  // origin: [
  //   'http://localhost:5173',
  //   'https://a-gift-for-dinda.vercel.app'
  // ],
  // credentials: true
}));
app.use(express.json());

// Only use the wish routes
app.use("/api/wishes", wishRoutes); 
// Optional: Basic root route
app.get("/", (req, res) => {
  res.send("Wish API is running");
});

app.use((err, req, res, next) => {
  console.error("Unhandled error:", err.stack);
  res.status(500).json({ message: "Something went wrong", error: err.message });
});

export default app;