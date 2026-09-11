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

// Restrict CORS to configured origin in production
const allowedOrigin = process.env.NODE_ENV === 'production'
    ? process.env.FRONTEND_URL
    : (process.env.DEV_FRONTEND_URL || true);

app.use(cors({
    origin: allowedOrigin,
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
            message: 'Database connection failed'
        });
    }
});

// One-time seed route — populates Atlas if empty
app.get('/api/v1/seed', seedProducts);

app.use('/api/v1/user', userRoute)
app.use('/api/v1/product', productRoutes)
app.use('/api/v1/order', orderRoutes)

// Minimal health check — no sensitive info exposed
app.get('/api/v1/healthcheck', (req, res) => {
    res.json({
        success: true,
        status: 'healthy',
        timestamp: new Date()
    });
});

// Only listen locally
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 8000;
    app.listen(PORT, () => {
        console.log(`Server running on port: ${PORT}`);
    });
}

export default app;