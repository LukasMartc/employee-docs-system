import { body } from "express-validator"

export const createEmployeeValidator = [
  body('fullname')
    .notEmpty().withMessage('El nombre completo del empleado es obligatorio')
    .isLength({ min: 3 }).withMessage('El nombre debe tener al menos 3 caracteres'),
  body('rut')
    .notEmpty().withMessage('El RUT es obligatorio')
    .matches(/^\d{7,8}-[kK\d]$/).withMessage('Formato de RUT inválido'),
  body('area')
    .notEmpty().withMessage('El área es obligatoria'),
  body('position')
    .notEmpty().withMessage('El cargo es obligatorio'),
  body('hireDate')
    .notEmpty().withMessage('La fecha de contratación es obligatoria')
    .isISO8601().withMessage('La fecha debe estar en formato válido (YYYY-MM-DD)')
    .toDate()
    .custom(value => {
      if (value > new Date()) {
        throw new Error('La fecha de contratación no puede ser futura')
      }
      return true
    })
]

export const updateEmployeeValidator = [
  body('fullname')
    .optional()
    .notEmpty().withMessage('El nombre completo del empleado es obligatorio')
    .isLength({ min: 3 }).withMessage('El nombre debe tener al menos 3 caracteres'),
  body('area')
    .optional()
    .notEmpty().withMessage('El área es obligatoria'),
  body('position')
    .optional()
    .notEmpty().withMessage('El cargo es obligatorio')
]

export const updateSensitiveDataValidator = [
  body('rut')
    .optional()
    .notEmpty().withMessage('El RUT es obligatorio')
    .matches(/^\d{7,8}-[kK\d]$/).withMessage('Formato de RUT inválido'),
  body('hireDate')
    .optional()
    .notEmpty().withMessage('La fecha de contratación es obligatoria')
    .isISO8601().withMessage('La fecha debe estar en formato válido (YYYY-MM-DD)')
    .toDate()
    .custom(value => {
      if (value > new Date()) {
        throw new Error('La fecha de contratación no puede ser futura')
      }
      return true
    })
]