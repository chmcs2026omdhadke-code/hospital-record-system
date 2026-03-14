import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import dns from "node:dns";

import { connectDB } from "./src/config/db.js";
import patientRoutes from "./src/routes/patientRoutes.js";

dns.setServers(["1.1.1.1", "8.8.8.8"]);

const app = express();

/* Middleware */
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  })
);

/* Test Route */
app.get("/", (req, res) => {
  res.send("Hospital API Running");
});

/* API Routes */
app.use("/api/patients", patientRoutes);

const PORT = process.env.PORT || 3000;

/* Start Server After DB Connect */
const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
      console.log(`Patients API: http://localhost:${PORT}/api/patients`);
    });

  } catch (error) {
    console.error("Server failed to start:", error);
    process.exit(1);
  }
};

startServer();