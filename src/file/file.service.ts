import { Injectable, InternalServerErrorException } from "@nestjs/common";
import * as fs from 'fs'
import * as path from 'path'
import * as uuid from 'uuid'

@Injectable()
export class FileService{
    async createFile(file: Express.Multer.File){
        try{
           const filePath = await this.pathGeneration(file)

            return filePath
        }catch(e){
            throw new InternalServerErrorException('При записи файла произошла ошибка...')
        }
    }

    async createFilesArray(files: Array<Express.Multer.File>){
        try{
            const pathsArray: Array<string> = [] 
            for (const file of files){
                const filePath = await this.pathGeneration(file)
                pathsArray.push(filePath)
            }

            return pathsArray
        }catch(e){
            throw new InternalServerErrorException('При записи файла произошла ошибка...')
        }
    }

    async pathGeneration(file: Express.Multer.File){
        const filename = uuid.v4() + path.extname(file.originalname)
        const filePath = path.resolve(__dirname, '..', 'static')

        if (!fs.existsSync(filePath))
            fs.mkdirSync(filePath, {recursive: true})

        fs.writeFileSync(path.join(filePath, filename), file.buffer)

        return filename
    }
}