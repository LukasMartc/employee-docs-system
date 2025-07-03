import User from "../models/user.model.js"
import { hashPassword, checkPassword } from "../utils/auth.js"
import { generateJWT } from "../utils/jwt.js"

export const createUserService = async userData => {
  const { username, password } = userData

  const userExists = await User.findOne({ username })
  if (userExists) {
    const error = new Error('El usuario ya esta registrado')
    error.status = 409
    throw error
  }

  const user = new User(userData)
  user.password = await hashPassword(password)
  await user.save()
  return user
}

export const loginUserService = async userCredentials => {
  const { username, password } = userCredentials

  const user = await User.findOne({ username })
  const isPasswordCorrect = await checkPassword(password, user.password)
  if (!user || !isPasswordCorrect) {
    const error = new Error('Usuario y/o contraseña incorrecta')
    error.status = 401
    throw error
  }

  return generateJWT({ id: user._id, role: user.role })
}
