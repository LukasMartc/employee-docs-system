import { Router } from "express"
import { authenticate } from "../middleware/auth.js"
import { autherizeAdmin } from "../middleware/authorize.js"
import { createEmployee } from "../controllers/employees.controller.js"


const router = Router()

router.post('/', authenticate, autherizeAdmin, createEmployee)

export default router