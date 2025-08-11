import { Router } from "express"
import { authenticate } from "../middleware/auth.js"
import { autherizeAdmin } from "../middleware/authorize.js"
import { uploadSingleFile, validateFileExists } from "../middleware/uploadMiddleware.js"
import { payrollValidator } from "../validators/payrollValidation.js"
import { handleInputErrors } from "../middleware/validation.js"
import { createPayroll } from "../controllers/payrolls.controller.js"

const router = Router()

router.post('/',
  authenticate,
  autherizeAdmin,
  uploadSingleFile('document'), // el nombre del campo en el form
  validateFileExists,
  payrollValidator,
  handleInputErrors,
  createPayroll
)

export default router