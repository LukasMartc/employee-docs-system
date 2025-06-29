import express, { json } from "express"
import "dotenv/config"
import { connectDB } from "./config/db.js"

const app = express()

connectDB()

app.use(json)

export default app
