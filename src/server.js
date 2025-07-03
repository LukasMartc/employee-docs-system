import express, { json } from "express"
import morgan from "morgan"
import "dotenv/config"
import { connectDB } from "./config/db.js"
import authRouter from "./routes/auth.routes.js"
import employeesRouter from "./routes/employees.routes.js"
import payrollsRouter from "./routes/payrolls.routes.js"

const app = express()

connectDB()

app.use(morgan('dev'))

app.use(json())

app.use('/auth', authRouter)
app.use('/employees', employeesRouter)
app.use('/payrolls', payrollsRouter)

export default app
