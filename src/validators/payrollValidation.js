import { body } from "express-validator"

export const payrollValidator = [
  body('employee')
    .notEmpty().withMessage('El empleado es requerido')
    .isMongoId().withMessage('ID de empleado no válido'),
  body('month')
    .notEmpty().withMessage('El mes es requerido')
    .isInt({ min: 1, max: 12 }).withMessage('Mes debe ser entre 1 y 12'),
  body('year')
    .notEmpty().withMessage('El año es requerido')
    .isInt({ min: 2000, max: new Date().getFullYear() })
    .withMessage(`El año debe estar entre 2000 y ${new Date().getFullYear()}`),
    body('totalAmount')
    .notEmpty().withMessage('El monto total es requerido')
    .isFloat({ min: 0 }).withMessage('El monto debe ser positivo'),
  body('details')
    .notEmpty().withMessage('Los detalles de la liquidación es obligatoria')
    .isString().withMessage('Los detalles deben ser texto')
    .trim()
    .isLength({ max: 1000 }).withMessage('Los detalles no pueden exceder 1000 caracteres'),
]
