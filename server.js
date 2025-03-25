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

// CORS Configuration
const allowedOrigins = ["https://react-app-scheduling.vercel.app"];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}));

// Handle Preflight Requests
app.options('*', cors());

// Middleware
app.use(express.json());
app.use(cookieParser());

// Database Connection
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);

// Handle Undefined Routes
app.use((req, res) => {
    res.status(404).json({ message: "Route not hvhgfcvyutg found" });
});

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Internal Server Error" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
