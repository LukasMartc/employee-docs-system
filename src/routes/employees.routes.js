import { Router } from "express"
import { authenticate } from "../middleware/auth.js"
import { autherizeAdmin } from "../middleware/authorize.js"
import { createEmployeeValidator, updateEmployeeValidator,
  updateSensitiveDataValidator } from "../validators/employeeValidation.js"
import { handleInputErrors } from "../middleware/validation.js"
import { createEmployee, getAllEmployees, getEmployee,
  deleteEmployee, updateEmployee, updateSensitiveData } from "../controllers/employees.controller.js"

const router = Router()

router.post('/', 
  authenticate, 
  autherizeAdmin, 
  createEmployeeValidator,
  handleInputErrors, 
  createEmployee
)

router.get('/',
  authenticate,
  autherizeAdmin,
  getAllEmployees
)

router.get('/:id',
  authenticate,
  getEmployee
)

router.delete('/:id',
  authenticate,
  autherizeAdmin,
  deleteEmployee
)

router.patch('/:id',
  authenticate,
  updateEmployeeValidator,
  handleInputErrors, 
  updateEmployee
)

router.patch('/:id/datos-sensibles',
  authenticate,
  autherizeAdmin,
  updateSensitiveDataValidator,
  handleInputErrors, 
  updateSensitiveData
)

export default router
