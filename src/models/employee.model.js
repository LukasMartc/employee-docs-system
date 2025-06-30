import mongoose, { Schema }  from "mongoose"

const employeeSchema = new Schema({
  fullname: {
    type: String,
    required: true,
    trim: true
  },
  rut: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  area: {
    type: String,
    required: true,
    trim: true
  },
  position: {
    type: String,
    required: true,
    trim: true
  },
  hireDate: {
    type: Date,
    required: true,
    max: Date.now
  }
}, {
  timestamps: true
})

const Employee = mongoose.model('Employee', employeeSchema)
export default Employee