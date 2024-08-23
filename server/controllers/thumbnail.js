import path from 'node:path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export const thumbnail = async (req, res) => {
    const img = req.query.path

    const imgPath = path.join(__dirname, '..', img)

    res.sendFile(imgPath)
}