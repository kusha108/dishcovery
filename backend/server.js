require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");
const helmet = require("helmet");
const compression = require("compression");
const rateLimit = require("express-rate-limit");

const connectDB = require("./src/config/db");

const app = express();

/* ===========================
   DATABASE
=========================== */

connectDB();

/* ===========================
   SECURITY
=========================== */

//  FIXED HELMET
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

app.use(compression());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  message: "Too many requests, try again later",
});

app.use(limiter);


/* ===========================
   CORS
=========================== */

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

/* ===========================
   BODY PARSING
=========================== */

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

/* ===========================
   STATIC UPLOADS (FIXED)
=========================== */

const uploadsPath = path.join(__dirname, "uploads");

app.use("/uploads", express.static(uploadsPath));

console.log(" Serving uploads from:", uploadsPath);

/* ===========================
   ROUTES
=========================== */

app.use("/api/auth", require("./src/routes/auth"));
app.use("/api/recipes", require("./src/routes/recipes"));
app.use("/api/ai", require("./src/routes/ai"));
app.use("/api/users", require("./src/routes/user"));

/* ===========================
   HEALTH CHECK
=========================== */

app.get("/", (req, res) => {
  res.send(" Dishcovery API Running");
});

/* ===========================
   GLOBAL ERROR HANDLER
=========================== */

app.use((err, req, res, next) => {
  console.error(" ERROR:", err.stack);

  res.status(500).json({
    success: false,
    message: "Server error",
    error:
      process.env.NODE_ENV === "development"
        ? err.message
        : undefined,
  });
});

/* ===========================
   START SERVER
=========================== */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(` Dishcovery Server running on port ${PORT}`);
});
