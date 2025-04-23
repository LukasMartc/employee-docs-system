import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  paternal_surname: {
    type: String,
    required: true,
    trim: true
  },
  maternal_surname: {
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
  password: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    require: true,
    trim: true,
    unique: true
  },
  telephone: {
    type: String,
    require: true,
    trim: true,
    unique: true
  },
  department: {
    type: String,
    require: true,
    trim: true
  },
  role: {
    type: String,
    require: true,
    trim: true
  },
  permissions: {
    can_create_employees: { type: Boolean, default: false},
    can_upload_documents: { type: Boolean, default: false},
  },
  active: { type: Boolean, default: true},
  documents: {
    annexes: [{ name: String, url: String }],
    liquidations: [{ name: String, url: String, date: Date }]
  }
},
{ timestamps: true })

const User = mongoose.model('User', userSchema)
export default User
