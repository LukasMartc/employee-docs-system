import bcrypt from 'bcrypt'

export const hashPassword = async password => {
  const salt = await bcrypt.genSalt(10)
  return await bcrypt.hash(password, salt)
}

export const checkPassword = async (enteredPassword, hash) => {
  return await bcrypt.compare(enteredPassword, hash)
}