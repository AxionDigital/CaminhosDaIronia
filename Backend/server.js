require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const connectDB = require("./src/config/bd");

const authRoutes = require("./src/routes/authRoutes");

connectDB();

const app = express()

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.use("/api", authRoutes);

const PORT = process.env.PORT || 3005;
app.listen(PORT, () =>
  console.log(`🔥 Backend rodando na porta ${PORT}`)
);
