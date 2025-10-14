require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');

// ✅ Disable TLS verification (keep only for local dev)
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const app = express();

// ✅ Connect MongoDB
connectDB();

// ✅ Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ✅ Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/recipes', require('./routes/recipes'));

// ✅ Global error handler (helps catch unhandled errors)
app.use((err, req, res, next) => {
  console.error('💥 Server Error:', err.stack);
  res.status(500).json({ message: 'Internal Server Error', error: err.message });
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
