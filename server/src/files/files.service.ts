import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import * as path from 'path'
import * as fs from 'fs'

@Injectable()
export class FilesService {
    public async createFile(file: Express.Multer.File, tag: string): Promise<string> {
        try {
            const fileName = tag + '.png'
            const filePath = path.resolve(__dirname, '..', 'static')

            if (!fs.existsSync(filePath)) {
                fs.mkdirSync(filePath, { recursive: true })
            }

            fs.writeFileSync(path.join(filePath, fileName), file.buffer)
            return fileName
        } catch (error) {
            throw new HttpException('Файл не получен', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    public async removeFile(tag: string): Promise<string> {
        try {
            const fileName = tag + '.png'
            const filePath = path.resolve(__dirname, '..', 'static')

            if (!fs.existsSync(path.join(filePath, fileName))) {
                return fileName
            }

            fs.unlinkSync(path.join(filePath, fileName))
            return fileName
        } catch (err) {
            throw new HttpException('Ошибка при удалении файла', err)
        }
    }
}
