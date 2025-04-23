import { Router } from "express";
import { body } from "express-validator";
import { UserController } from "./controllers/userController.js";
import { handleInputErrors } from "./middleware/validation.js";

const router = Router()

router.post('/auth/register', 
  body('name')
    .notEmpty().withMessage('El nombre del empleado es obligatorio'),
  body('paternal_surname')
    .notEmpty().withMessage('El apellido paterno del empleado es obligatorio'),
  body('maternal_surname')
    .notEmpty().withMessage('El apellido materno del empleado es obligatorio'),
  body('rut')
    .notEmpty().withMessage('El RUT es obligatorio')
    .matches(/^(\d{1,3}(?:\.\d{1,3}){2}-[\dkK]|\d{7,8}-[\dkK])$/i)
    .withMessage('RUT inválido. Formato esperado: 12.345.678-9 o 12345678-9'),
  body('password')
    .notEmpty().withMessage('La contraseña es obligatoria')
    .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
  body('email')
    .notEmpty().withMessage('El email es obligatorio')
    .isEmail().withMessage('Email inválido')
    .normalizeEmail(),
  body('telephone')
    .notEmpty().withMessage('El teléfono es obligatorio')
    .matches(/^(\+?56)?[1-9]\d{8}$/).withMessage('Teléfono inválido. Ejemplo: +56912345678'),
  body('department')
    .notEmpty().withMessage('El rol es obligatorio'),
  handleInputErrors,
  UserController.create)

router.get('/:id', UserController.get)

export default router
