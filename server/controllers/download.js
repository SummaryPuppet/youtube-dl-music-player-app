import { getSong } from "../db.js"

export const download = async (req, res) => {
    const id = req.query.id

    if (!id) {
        res.status(400).send("ID is required")
    }
    try {
        const { title } = await getSong(id)

        const path = `songs/${title}/song.mp3`

        res.download(path, err => {
            if (err) {
                console.error("Error in download file " + err)
                res.status(404).send("File not found")
            }
        })
    } catch (error) {
        console.error("Error in download file " + error)
        res.status(500).send("Error in server")
    }
}