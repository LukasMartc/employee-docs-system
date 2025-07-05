import colors from "colors"
import { createEmployeeService } from "../services/employees.service.js"

export const createEmployee = async (req, res) => {
  try {
    const newEmployee = await createEmployeeService(req.body)
    return res.status(201).json({
      msg: 'Empleado creado correctamente',
      employee: newEmployee
    })
  } catch (error) {
    console.log(colors.red(error))
    const status = error.status || 500
    return res.status(status).json({ error: error.message })
  }
}