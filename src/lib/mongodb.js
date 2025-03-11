
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://ababuoturi:HtF99FHKJUv6ifZb@mycluster.6n6qd.mongodb.net/employee?retryWrites=true&w=majority";

if (!MONGODB_URI) {
    throw new Error("⚠️ Missing MONGODB_URI in .env file");
}

export async function connectToDatabase() {
    if (mongoose.connection.readyState >= 1) {
        console.log("✅ MongoDB already connected");
        return;
    }

    try {
        await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds
        });
        console.log("✅ MongoDB Connected Successfully!");
    } catch (error) {
        console.error("❌ MongoDB Connection Error:", error);
        throw new Error("MongoDB connection failed");
    }
}
