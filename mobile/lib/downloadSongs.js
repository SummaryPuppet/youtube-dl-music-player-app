import * as FileSystem from 'expo-file-system'
import { shareAsync } from 'expo-sharing'
import { Platform } from 'react-native'
import { storage } from '../storage/storage'
import { requestDirectoryPermissionsAsync, saveInDevice } from './fs'

const HOST = async () => await storage.getString("server-url") ?? "http://192.168.1.71:3000"

export const downloadInServer = async (url) => {
    try {
        const response = await fetch(`${await HOST()}/upload?url=${url}`).then(res => res.json())

        return response
    } catch (error) {
        console.error(error)
    }
}


export const downloadInDevice = async (title, id) => {
    try {
        const downloadFile = await FileSystem.downloadAsync(
            `${await HOST()}/download?id=${id}`
            , FileSystem.documentDirectory + title, {}, downloadProgress => {
                const progress = downloadProgress.totalBytesWritten / downloadProgress.totalBytesExpectedToWrite;
                this.setState({
                    downloadProgress: progress,
                });
            })

        const filename = `${title}.mp3`
        const mimeType = downloadFile.mimeType || "mp3" || 'audio/mpeg'


        if (Platform.OS === "android") {
            const hasPermisions = await requestDirectoryPermissionsAsync()

            if (hasPermisions.access) {
                await saveInDevice(downloadFile.uri, filename, mimeType, hasPermisions)

                await storage.set("musicDir", hasPermisions.directoryUri)

            } else {
                shareAsync(downloadFile.uri)
            }
        } else {
            shareAsync(downloadFile.uri)
        }

    } catch (error) {
        console.error(error)

    }
}

export const allSongs = async () => {
    try {
        const host = await HOST()
        const response = await fetch(await HOST()).then(res => res.json())

        const songs = response.map(item => {
            return {
                id: item.id,
                title: item.title,
                author: item.author,
                thumbnail: `${host}/thumbnail?path=${item.thumbnail}`
            }
        })


        return songs
    } catch (error) {
        console.error(error)
    }
}