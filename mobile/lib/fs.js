import * as FileSystem from 'expo-file-system'
import { Alert } from "react-native"

export const requestDirectoryPermissionsAsync = async () => {
    const permisions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync()

    if (!permisions.granted) {
        return {
            access: false,
            directoryUri: null
        }
    }

    return {
        access: true,
        directoryUri: permisions.directoryUri
    }
}

export const saveInDevice = async (uri, filename, mimetype, hasPermisions) => {
    const base64 = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 })

    await FileSystem.StorageAccessFramework.createFileAsync(hasPermisions.directoryUri, filename, mimetype)
        .then(async (uri) => {
            await FileSystem.writeAsStringAsync(uri, base64, { encoding: FileSystem.EncodingType.Base64 })
        })
        .then(res => {
            console.log(res)
            Alert.alert("Success", "File saved")
        })
        .catch(e => console.error(e))
}


export const getInfo = async (directoryUri) => {
    try {
        const files = await FileSystem.StorageAccessFramework.readDirectoryAsync(directoryUri)

        let filesFilename = []

        for (const fileURI of files) {
            const filename = decodeURIComponent(fileURI).split("/").pop()
            filesFilename.push(filename)
        }

        return filesFilename

    } catch (error) {
        console.error(error)
    }
}

export const saveImg = (title, base64) => {
    const fileURI = FileSystem.documentDirectory + title + ".jpg"

    FileSystem.writeAsStringAsync(fileURI, base64, {
        encoding: FileSystem.EncodingType.Base64
    })

    return fileURI
}

export const convertUriToFilePath = async (uri) => {
    try {
        const { uri: fileURI } = await FileSystem.getContentUriAsync(uri)

        return fileURI
    } catch (error) {
        console.error(error)
        return null

    }
}