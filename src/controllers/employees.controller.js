import colors from "colors"
import { createEmployeeService, getAllEmployeesService,
  getEmployeeService } from "../services/employees.service.js"

export const createEmployee = async (req, res) => {
  try {
    const newEmployee = await createEmployeeService(req.body)
    return res.status(201).json({
      msg: 'Empleado y usuario creados correctamente',
      employee: newEmployee
    })
  } catch (error) {
    console.log(colors.red(error))
    const status = error.status || 500
    return res.status(status).json({ error: error.message })
  }
}

export const getAllEmployees = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    
    const data = await getAllEmployeesService({ page, limit }, req.query)

    res.json(data)
  } catch (error) {
    console.log(colors.red(error))
    const status = error.status || 500
    res.status(status).json({ error: error.message })
  }
}

export const getEmployee = async (req, res) => {
  try {
    const employee = await getEmployeeService(req.params)
    return res.status(200).json(employee)
  } catch (error) {
    console.log(colors.red(error))
    const status = error.status || 500
    res.status(status).json({ error: error.message })
  }
}
