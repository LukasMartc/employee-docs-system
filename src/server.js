import express from 'express'
import 'dotenv/config'
import router from './router.js'
import { connectDB } from './config/db.js'

const app = express()

connectDB()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/users', router)

export default app
