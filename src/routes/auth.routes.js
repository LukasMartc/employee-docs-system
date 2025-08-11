import { Router } from "express"
import { authenticate } from "../middleware/auth.js"
import { autherizeAdmin } from "../middleware/authorize.js"
import { registerAdminValidation, loginValidation } from "../validators/authValidation.js"
import { handleInputErrors } from "../middleware/validation.js"
import { createAdmin, loginUser } from "../controllers/auth.controller.js"

const router = Router()

router.post('/registerAdmin',
  authenticate,
  autherizeAdmin,
  registerAdminValidation,
  handleInputErrors,
  createAdmin
)

router.post('/login',
  loginValidation,
  handleInputErrors,
  loginUser
)

export default router
