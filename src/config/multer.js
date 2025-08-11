import multer from "multer"
import path from "path"
import { v4 as uuidv4 } from "uuid"

// Dónde y cómo guardar el achivo
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/') // Carpeta donde se guardan los archivos
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname) // extrae la extensión del archivo (.pdf)
    const filename = `${uuidv4()}${ext}`        // genera un nombre único como: 8a1f3b9a.pdf
    cb(null, filename)                          // guarda el archivo con ese nombre
  }
})

// Que tipo de archivos aceptar
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['application/pdf'] // Solo permite pdf, 'application/pdf' → es el MIME type de un archivo PDF
  if (allowedTypes.includes(file.mimetype)) { // El tipo MIME del archivo está dentro de allowedTypes? 
    cb(null, true) // Acepta el archivo
  } else {
    cb(new Error('Solo se permiten archivos PDF')) // Rechaza con un error
  }
}

const upload = multer({ storage, fileFilter })

export default upload
