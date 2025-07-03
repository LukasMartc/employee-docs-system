import { Router } from "express"
import { body } from "express-validator"
import { createUser, loginUser } from "../controllers/auth.controller.js"
import { handleInputErrors } from "../middleware/validation.js"

const router = Router()

router.post('/register',
  body('username')
    .notEmpty().withMessage('El nombre de usuario es obligatorio'),
  body('password')
    .isLength({ min: 4 }).withMessage('La contraseña debe tener al menos 4 caracteres'),
  body('role')
    .isIn(['admin', 'employee'])
    .withMessage('El rol del usuario no es valido'),
  handleInputErrors,
  createUser)

router.post('/login',
  body('username')
    .notEmpty().withMessage('El nombre de usuario es obligatorio'),
  body('password')
    .notEmpty().withMessage('La contraseña es obligatoria'),
  handleInputErrors,
  loginUser
)

export default router