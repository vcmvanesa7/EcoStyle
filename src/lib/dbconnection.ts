import mongoose, { Mongoose } from "mongoose";

declare global {
    var mongoose: {
        conn: Mongoose | null;
        promise: Promise<Mongoose> | null;
    };
}

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
    throw new Error("Please define MONGODB_URI in your environment variables");
}

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

export default async function dbConnection() {
    if (cached.conn)
        return cached.conn;
    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGODB_URI).then((m) => m);
    }

    cached.conn = await cached.promise;
    global.mongoose = cached;
    return cached.conn;
}