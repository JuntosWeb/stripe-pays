// eslint-disable-next-line @typescript-eslint/ban-types
export const fileFilter = (req: Express.Request, file: Express.Multer.File, callback: Function) => {
    if (!file) return callback(new Error("File is empty"), false);
    const fileExtension = file.mimetype.split('/')[1]
    const validExtension = ['jpg', 'png', 'gif', 'jpeg'];
    return (!validExtension.includes(fileExtension))
        ? callback(null, false)
        : callback(null, true);

}