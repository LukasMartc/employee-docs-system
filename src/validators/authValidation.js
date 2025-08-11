import { body } from "express-validator"

export const registerAdminValidation = [
  body('username')
    .notEmpty().withMessage('El nombre de usuario es obligatorio'),
  body('password')
    .isLength({ min: 4 }).withMessage('La contraseña debe tener al menos 4 caracteres'),
]

export const loginValidation = [
  body('username')
    .notEmpty().withMessage('El nombre de usuario es obligatorio'),
  body('password')
    .notEmpty().withMessage('La contraseña es obligatoria')
]
