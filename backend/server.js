import express from 'express'
import dotenv from 'dotenv'
dotenv.config({ override: false }) // Vercel env vars take priority over .env file
import connectDB from './database/db.js';
import { seedProducts } from './seed/productSeeder.js';
import userRoute from './routes/userRoute.js'
import productRoutes from './routes/productRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import cors from 'cors'

const app = express()

app.use(express.json({ limit: '10mb' }));
app.use(cors({
    origin: true,
    credentials: true
}))

// Connect to DB before handling any API request
app.use(async (req, res, next) => {
    try {
        await connectDB();
        next();
    } catch (err) {
        console.error('DB connection error:', err.message);
        return res.status(500).json({
            success: false,
            message: 'Database connection failed: ' + err.message
        });
    }
});

// One-time seed route — populates Atlas if empty
app.get('/api/v1/seed', seedProducts);

app.use('/api/v1/user', userRoute)
app.use('/api/v1/product', productRoutes)
app.use('/api/v1/order', orderRoutes)

app.get('/api/v1/healthcheck', async (req, res) => {
    const mongoose = await import('mongoose');
    res.json({
        success: true,
        mongo_uri_set: !!process.env.MONGO_URI,
        mongo_uri_preview: process.env.MONGO_URI ? process.env.MONGO_URI.substring(0, 40) + '...' : 'NOT SET',
        readyState: mongoose.default.connection.readyState,
        node_env: process.env.NODE_ENV || 'not set'
    });
});

app.get('/api/v1/debug', async (req, res) => {
    try {
        await connectDB();
        const mongoose = await import('mongoose');
        res.json({
            success: true,
            readyState: mongoose.default.connection.readyState,
            host: mongoose.default.connection.host
        });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// Only listen locally
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 8000;
    app.listen(PORT, () => {
        console.log(`Server running on port: ${PORT}`);
    });
}

export default app;