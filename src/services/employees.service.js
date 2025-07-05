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