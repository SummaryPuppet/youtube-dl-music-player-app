import axios from 'axios'
import progress from 'progress-estimator'
import ytdl from "youtube-dl-exec"
import ytdlCore from 'ytdl-core'

import fs from 'node:fs'

import { insertSong } from '../db.js'
import { clean } from '../util/cleanTitleSong.js'
import { writeMetadata } from '../util/writeMetadata.js'

const progressBar = progress()

export const upload = async (req, res) => {
    const url = req.query.url

    if (!url) {
        res.status(400).send("URL is required")
    }

    try {
        const {
            title, outputSong, thumbnailURL, outputThumbnail, author
        } = await getInfoFromSong(url)


        if (!fs.existsSync(`songs/${title}`)) {
            fs.mkdirSync(`songs/${title}`, { recursive: true });
        }

        const ytdlTask = ytdl(url, {
            output: outputSong,
            extractAudio: true,
            audioFormat: "mp3",
            audioQuality: 0,
            format: "bestaudio"
        }, {
            timeout: 15000,
            killSignal: "SIGKILL"
        })

        const downloadThumbnailTask = axios.get(thumbnailURL, { responseType: "stream" })

        const writer = fs.createWriteStream(outputThumbnail)

        await progressBar(ytdlTask, `Obtain URL`)

        const response = await downloadThumbnailTask

        response.data.pipe(writer)

        const tags = {
            artist: author,
            image: {
                mime: "image/jpg",
                type: {
                    id: 3,
                    name: "Cover (front)"
                },
                description: "Cover",
                imageBuffer: fs.readFileSync(outputThumbnail)
            }
        }

        writeMetadata(tags, outputSong)

        await insertSong(title, outputThumbnail)

        res.json({
            status: "OK",
            message: "Download Complete"
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            status: "ERR"
        })
    }
}

async function getInfoFromSong(url) {
    const info = await ytdlCore.getInfo(url);

    const title = clean(info.videoDetails.title)
    const author = info.videoDetails.author
    const outputSong = `songs/${title}/song.mp3`

    const thumbnailURL = info.videoDetails.thumbnails[0].url
    const outputThumbnail = `songs/${title}/thumbnail.jpg`

    return {
        title,
        outputSong,
        thumbnailURL,
        outputThumbnail,
        author
    }
}