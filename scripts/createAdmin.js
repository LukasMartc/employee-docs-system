import "dotenv/config"
import colors from "colors"
import { connectDB } from "../src/config/db.js"
import User from "../src/models/user.model.js"
import { hashPassword } from "../src/utils/auth.js"

const createAdmin = async () => {
  try {
    await connectDB()
    const username = process.env.ADMIN_USERNAME
    const plainPassword = process.env.ADMIN_PASSWORD
    const hashedPassword = await hashPassword(plainPassword)
    
    const adminExists = await User.findOne({ username })
    if (adminExists) {
      console.log('El administrador ya existe'.yellow)
      return process.exit()
    }

    const admin = new User({
      username,
      password: hashedPassword,
      role: 'admin'
    })

    await admin.save()
    console.log('Administrador creado correctamente')
    process.exit()
  } catch (error) {
    console.error('Error al crear admin:', error)
    process.exit(1)
  }
}

createAdmin()
