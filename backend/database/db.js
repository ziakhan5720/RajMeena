import mongoose from "mongoose";
import dns from "dns";

// Use Google DNS to bypass potential local DNS issues with SRV records
try {
    dns.setServers(["8.8.8.8", "8.8.4.4"]);
} catch (err) {
    console.warn("Could not set custom DNS servers:", err.message);
}

const ATLAS_URI = "mongodb+srv://ziakhan5720_db_user:iby4149LAInJ2gMJ@cluster0.s62wpdx.mongodb.net/rajmeena?appName=Cluster0";

const connectDB = async () => {
    if (mongoose.connection.readyState === 1) return; // already connected

    // Use Vercel dashboard env var if available, otherwise use Atlas URI directly
    const uri = process.env.MONGO_URI && !process.env.MONGO_URI.includes('localhost')
        ? process.env.MONGO_URI
        : ATLAS_URI;

    try {
        await mongoose.connect(uri, {
            serverSelectionTimeoutMS: 15000,
            connectTimeoutMS: 15000,
            socketTimeoutMS: 30000,
            maxPoolSize: 10,
        });
        console.log(`✅ MongoDB connected: ${mongoose.connection.host}`);
    } catch (error) {
        console.error("❌ MongoDB connection failed:", error.message);
        throw error;
    }
};

export default connectDB;