import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db";
import authRoutes from "./routes/authRoutes";
import leadRoutes from "./routes/leadRoutes";

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

/*
  ROUTES
*/
app.use("/api/auth", authRoutes);
app.use("/api/leads", leadRoutes);

/*
  TEST ROUTE
*/
app.get("/", (req, res) => {
  res.send("API Running");
});

/*
  PORT
*/
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});