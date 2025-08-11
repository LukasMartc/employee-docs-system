import upload from "../config/multer.js"

// Manejar multer y capturar errores
export const uploadSingleFile = fieldName => (req, res, next) => {
  upload.single(fieldName)(req, res, function (error) {
    if (error) {
      // Error de multer (tipo archivo, tamaño, etc)
      return res.status(400).json({ error: error.message })
    }
    next()
  })
}

// Valida que el archivo exista
export const validateFileExists = (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({ error: 'Archivo de liquidación requerido' })
  }
  next()
}
