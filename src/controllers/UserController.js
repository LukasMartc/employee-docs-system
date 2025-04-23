import User from "../models/User.js"
import { hashPassword } from "../utils/auth.js"

export class UserController {
  static create = async (req, res) => {
    const { email, rut, telephone, password } = req.body
    
    const emailExists = await User.findOne({ email })
    if (emailExists) {
      const error = new Error('El email ya está registrado')
      return res.status(409).json({ msg: error.message })
    }

    const rutExists = await User.findOne( { rut })
    if (rutExists) {
      const error = new Error('El rut ya está registrado')
      return res.status(409).json({ msg: error.message })
    }

    const telephoneExists = await User.findOne({ telephone })
    if(telephoneExists) {
      const error = new Error('El teléfono ya está registrado')
      return res.status(409).json({ msg: error.message })
    }
    
    try {
      const user = new User(req.body)
      user.password = await hashPassword(password)
      await user.save()
      res.status(201).json('Empleado creado correctamente')
    } catch (error) {
      res.status(500).json({ error: 'Hubo un error' })
    }
  }

  static get = async (req, res) => {
    console.log('Desde /api/users/:id')
  }
}
