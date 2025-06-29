import mongoose, { Schema } from "mongoose"

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minLength: 4
  },
  role: {
    type: String,
    required: true,
    trim: true,
    enum: ['admin', 'employee']
  },
  employee: {
    type: Schema.Types.ObjectId,
    ref: 'Employee',
    default: null
  }
}, {
  timestamps: true
})

const User = mongoose.model('User', userSchema)
export default User
