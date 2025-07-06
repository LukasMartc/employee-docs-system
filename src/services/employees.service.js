import Employee from "../models/employee.model.js"

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