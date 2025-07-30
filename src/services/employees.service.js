import mongoose from "mongoose"
import Employee from "../models/employee.model.js"
import User from "../models/user.model.js"
import { hashPassword } from "../utils/auth.js"

export const createEmployeeService = async employeeData => {
  const { rut } = employeeData

  const employeeExists = await Employee.findOne({ rut })
  if (employeeExists) {
    const error = new Error('El empleado ya esta registrado')
    error.status = 409
    throw error
  }

  const employee = new Employee(employeeData)
  await employee.save()

  const userEmployee = {
    username: employee.rut,
    password: employee.rut.split('-')[0].slice(-4),
    role: 'employee',
    employee: employee._id
  }

  const user = new User(userEmployee)
  user.password = await hashPassword(userEmployee.password)
  await user.save()

  return employee
}

export const getAllEmployeesService = async ({ page = 1, limit = 10 }, filters) => {
  const skip = (page - 1) * limit
  const { search, area } = filters
  const filter = {}

  if (search) {
    filter.fullname = { $regex: search, $options: 'i' }
  }

  if (area) {
    filter.area = area
  }

  const [employees, total] = await Promise.all([
    Employee.find(filter).skip(skip).limit(limit),
    Employee.countDocuments(filter)
  ])

   if(employees.length === 0) {
    const error = new Error('No se encontraron empleados con los filtros proporcionados')
    error.status = 404
    throw error
  }

  const totalPages = Math.ceil(total / limit)

  return {
    currentPage: page,
    totalPages,
    totalEmployees: total,
    employees
  }
}

export const getEmployeeService = async ({ id, requester }) => {
  // Validar el ObjectId antes de buscar
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const error = new Error('Solicitud no válida')
    error.status = 400
    throw error
  }

  // Validación acceso para empleados con el mismo id
  if (requester.role === 'employee' && requester.employee.toString() !== id) {
    const error = new Error('No tienes permiso para ver este perfil')
    error.status = 403
    throw error
  }

  const employeeFound = await Employee.findById(id).select('fullname rut area position hireDate')
  if (!employeeFound) {
    const error = new Error('El empleado no existe')
    error.status = 404
    throw error
  }

  return employeeFound
}

export const deleteEmployeeService = async employeeId => {
  const { id } = employeeId

  // Validar el ObjectId antes de buscar
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const error = new Error('Solicitud no válida')
    error.status = 400
    throw error
  }

  const employeeExists = await Employee.findById(id)
  if (!employeeExists) {
    const error = new Error('El empleado no existe')
    error.status = 404
    throw error
  }

  await User.findOneAndDelete({ employee: id })
  await Employee.findByIdAndDelete(id)
}

export const updateEmployeeService = async ({ id, requester, ...newData }) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const error = new Error('Solicitud no válida')
    error.status = 400
    throw error
  }

  if (requester.role === 'employee' && requester.employee.toString() !== id) {
    const error = new Error('No tienes permiso para ver este perfil')
    error.status = 403
    throw error
  }

  const employeeExists = await Employee.findById(id)
  if (!employeeExists) {
    const error = new Error('El empleado no existe')
    error.status = 404
    throw error
  }

  // Que el empleado no pueda cambiar el rut si existe y es distinto
  if (newData.rut && newData.rut !== employeeExists.rut) {
    const error = new Error('No está permitido modificar el RUT')
    error.status = 404
    throw error
  }

  Object.assign(employeeExists, newData)
  await employeeExists.save()
  
  return employeeExists
}
