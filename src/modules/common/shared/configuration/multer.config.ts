import { MulterModuleOptions } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import { extname } from 'path'

export const multerConfig: MulterModuleOptions = {
  storage: diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
      const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
      cb(null, `${randomName}${extname(file.originalname)}`)
    }
  })
}