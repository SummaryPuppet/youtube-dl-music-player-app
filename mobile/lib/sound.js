import { Audio } from 'expo-av';
import * as MediaLibrary from 'expo-media-library';

export const getSounds = () => {
    return new Promise(async (resolve, reject) => {
        try {
            await requestPermissions()
            const sounds = getAssets()
            resolve(sounds)
        } catch (e) {
            reject(e)
        }
    })
}

export const createSound = async (fileUri) => {
    try {
        const { sound } = await Audio.Sound.createAsync({
            uri: fileUri
        }, {
            shouldPlay: true
        })

        return sound
    } catch (e) {
        console.error(e)
    }
}

export const playStop = async (sound, isPlay) => {
    try {
        if (!isPlay) {
            await sound.playAsync()
        } else {
            await sound.pauseAsync()
        }
    } catch (error) {
        console.error(error)
    }
}



const requestPermissions = async () => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== 'granted') {
        console.error("error")
    }
}

const getAssets = async () => {
    const media = await MediaLibrary.getAssetsAsync({
        mediaType: "audio"
    })

    return media.assets
}
