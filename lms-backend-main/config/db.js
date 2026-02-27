import mongoose from "mongoose"

const dbConnect = async () => {
    const uri = process.env.MONGO_URI
    if (!uri) {
        throw new Error("MONGO_URI is not set in the environment")
    }

    await mongoose.connect(uri)
    console.log("MongoDB connected")
}

export default dbConnect