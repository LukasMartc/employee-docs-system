import colors from "colors"
import { createEmployeeService, getAllEmployeesService,
  getEmployeeService, deleteEmployeeService,
  updateEmployeeService } from "../services/employees.service.js"

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

    return res.json(data)
  } catch (error) {
    console.log(colors.red(error))
    const status = error.status || 500
    return res.status(status).json({ error: error.message })
  }
}

export const getEmployee = async (req, res) => {
  try {
    const employee = await getEmployeeService({ id: req.params.id, requester: req.user })
    return res.status(200).json(employee)
  } catch (error) {
    console.log(colors.red(error))
    const status = error.status || 500
    return res.status(status).json({ error: error.message })
  }
}

export const deleteEmployee = async (req, res) => {
  try {
    await deleteEmployeeService(req.params)
    return res.status(200).json({ msg: 'El "empleado" junto a su "usuario" han sido eliminado correctamente' })
  } catch (error) {
    console.log(colors.red(error))
    const status = error.status || 500
    return res.status(status).json({ error: error.message })
  }
}

export const updateEmployee = async (req, res) => {
  try {
    if ('rut' in req.body) delete req.body.rut
    if ('hireDate' in req.body) delete req.body.hireDate

    const employee = await updateEmployeeService({ id: req.params.id, requester: req.user, ...req.body})
    return res.status(200).json(employee)
  } catch (error) {
    console.log(colors.red(error))
    const status = error.status || 500
    return res.status(status).json({ error: error.message })
  }
}
