import Payroll from "../models/payroll.model.js";
import Employee from "../models/employee.model.js"
import mongoose from "mongoose";

export const createPayrollService = async dataPayroll => {
  const { employee, month, year, document } = dataPayroll

  if (!document) {
    const error = new Error('Archivo de liquidación requerido')
    error.status = 400
    throw error
  }

  if (!mongoose.Types.ObjectId.isValid(employee)) {
    const error = new Error('Solicitud no válida')
    error.status = 400
    throw error
  }

  const employeeExists = await Employee.findById(employee)
  if (!employeeExists) {
    const error = new Error('El empleado no existe')
    error.status = 404
    throw error
  }

  const payrollExists = await Payroll.findOne({ employee, month, year })
  if (payrollExists) {
    const error = new Error('Ya existe una liquidación de esa fecha para el empleado')
    error.status = 409
    throw error
  }

  const payroll = new Payroll(dataPayroll)
  await payroll.save()
  return payroll
}
