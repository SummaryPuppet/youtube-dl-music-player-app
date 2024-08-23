import NodeID3 from 'node-id3'

export const writeMetadata = (tags, filePath) => {
    console.log("Write metadata")
    const success = NodeID3.write(tags, filePath)
    console.log(success)
    if (!success) {
        console.error("Error in write metadata")
    }

}