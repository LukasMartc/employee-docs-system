import { Router } from "express"
import { body } from "express-validator"
import { authenticate } from "../middleware/auth.js"
import { autherizeAdmin } from "../middleware/authorize.js"
import { createAdmin, loginUser } from "../controllers/auth.controller.js"
import { handleInputErrors } from "../middleware/validation.js"

const router = Router()

router.post('/registerAdmin',
  authenticate,
  autherizeAdmin,
  body('username')
    .notEmpty().withMessage('El nombre de usuario es obligatorio'),
  body('password')
    .isLength({ min: 4 }).withMessage('La contraseña debe tener al menos 4 caracteres'),
  handleInputErrors,
  createAdmin
)

router.post('/login',
  body('username')
    .notEmpty().withMessage('El nombre de usuario es obligatorio'),
  body('password')
    .notEmpty().withMessage('La contraseña es obligatoria'),
  handleInputErrors,
  loginUser
)

export default router
