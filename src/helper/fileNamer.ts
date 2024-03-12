import { v4 as uuid } from 'uuid'
// eslint-disable-next-line @typescript-eslint/ban-types
export const fileNamer = (req: Express.Request, file: Express.Multer.File, callback: Function) => {


    const fileExtension = file.mimetype.split('/')[1]

    const newFilename = `${uuid()}.${fileExtension}`

    if (!file) return callback(new Error("File is empty"), false);
    callback(null, newFilename)
}