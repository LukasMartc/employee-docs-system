import mongoose, { Schema }  from "mongoose"

const payrollSchema = new Schema({
  employee: {
    type: Schema.Types.ObjectId,
    ref: 'Employee',
    required: true
  },
  month: {
    type: Number,
    required: true,
    min: 1,
    max: 12
  },
  year: {
    type: Number,
    required: true,
    min: 2000
  },
  totalAmount: {
    type: Number,
    required: true,
    min: 0
  },
  details: {
    type: String,
    trim: true
  },
  document: {
    type: String,
    required: true,
    trim: true
  }
}, {
  timestamps: true
})

payrollSchema.index({ employee: 1, month: 1, year: 1 }, { unique: true })

const Payroll = mongoose.model('Payroll', payrollSchema)
export default Payroll
