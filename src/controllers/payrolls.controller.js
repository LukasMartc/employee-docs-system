import colors from "colors"
import { createPayrollService } from "../services/payrolls.service.js"

export const createPayroll = async (req, res) => {
  try {
    const document = req.file?.filename
    const data = await createPayrollService({ ...req.body, document })
    return res.status(201).json({ msg: 'Liquidación creada', payroll: data })
  } catch (error) {
    console.log(colors.red(error))
    const status = error.status || 500
    return res.status(status).json({ error: error.message })
  }
} 