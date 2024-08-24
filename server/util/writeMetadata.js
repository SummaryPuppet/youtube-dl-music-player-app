import NodeID3 from 'node-id3'
import fs from 'node:fs/promises'

export const writeMetadata = async ({ title = "", author = "", outputThumbnail }, filePath) => {
    setTimeout(async () => {
        console.log("Write metadata")

        const tags = {
            title,
            artist: author,
            image: {
                mime: "image/jpg",
                type: {
                    id: 3,
                    name: "Cover (front)"
                },
                description: "Cover",
                imageBuffer: await fs.readFile(outputThumbnail)
            }
        }

        const success = NodeID3.write(tags, filePath)

        if (!success) {
            console.error("Error in write metadata")
        }
    }, 10000)
}