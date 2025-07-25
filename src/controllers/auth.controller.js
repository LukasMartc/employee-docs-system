import colors from "colors"
import { createAdminService, loginUserService } from "../services/auth.service.js"

export const createAdmin = async (req, res) => {
  try {
    const newUser = await createAdminService(req.body)
    return res.status(201).json({
      msg: 'Usuario creado correctamente',
      user: newUser
    })
  } catch (error) {
    console.log(colors.red(error))
    const status = error.status || 500
    return res.status(status).json({ error: error.message })
  }
}

export const loginUser = async (req, res) => {
  try {
    const token = await loginUserService(req.body)
    return res.status(200).json({ token })
  } catch (error) {
    console.log(colors.red(error))
    const status = error.status || 500
    return res.status(status).json({ error: error.message })
  }
}
