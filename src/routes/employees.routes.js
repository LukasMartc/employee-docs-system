import { Router } from "express"
import { body } from "express-validator"
import { authenticate } from "../middleware/auth.js"
import { autherizeAdmin } from "../middleware/authorize.js"
import { handleInputErrors } from "../middleware/validation.js"
import { createEmployee, getAllEmployees } from "../controllers/employees.controller.js"

const router = Router()

router.post('/', 
  authenticate, 
  autherizeAdmin, 
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
    }),
  handleInputErrors, 
  createEmployee)

router.get('/',
  authenticate,
  autherizeAdmin,
  getAllEmployees
)

export default router