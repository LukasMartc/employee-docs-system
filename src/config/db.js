import mongoose from "mongoose"
import colors from "colors"

export const connectDB = async () => {
  try {
    const { connection } = await mongoose.connect(process.env.MONGO_URL)
    const url = `${connection.host}:${connection.port}`
    console.log(`MongoDB connected in ${url}`.blue)
  } catch (error) {
    console.log((error.message).bgRed.white)
    process.exit(1)
  }
};
