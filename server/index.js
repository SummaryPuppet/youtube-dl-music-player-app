import cors from 'cors'
import express from "express"
import { download } from "./controllers/download.js"
import { thumbnail } from './controllers/thumbnail.js'
import { upload } from "./controllers/upload.js"
import { createSongsTable, selectSongs } from './db.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

createSongsTable()

const PORT = process.env.PORT || 3000

app.get("/", async (_, res) => {
    const songs = await selectSongs()

    res.send(songs)
})

app.get("/upload", upload)
app.get("/download", download)
app.get('/thumbnail', thumbnail)

app.listen(PORT, () => console.log(`Server on port: ${PORT}`))