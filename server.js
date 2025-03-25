const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const eventRoutes = require('./routes/eventRoutes');

dotenv.config();
const app = express();

// Debugging Logs
console.log("authRoutes:", authRoutes);
console.log("eventRoutes:", eventRoutes);

// Middleware
app.use(cors({
    origin: "http://localhost:5173", // Change to your frontend URL
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Database Connection
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);

// Handle Undefined Routes
app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Internal Server Error" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
