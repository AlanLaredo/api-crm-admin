import { Injectable } from '@nestjs/common'
import * as fs from 'fs'
import { promisify } from 'util'

const readFileAsync = promisify(fs.readFile)
@Injectable()
export class FileService {
  async readFile(filePath: string): Promise<string> {
    try {
      const data = await readFileAsync(filePath, 'utf8')
      return data
    } catch (error) {
      throw new Error(`Error al leer el archivo: ${error.message}`)
    }
  }
}
