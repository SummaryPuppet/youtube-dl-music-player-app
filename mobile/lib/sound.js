import * as MediaLibrary from 'expo-media-library';
import { Platform } from 'react-native';
import TrackPlayer, { Capability, RepeatMode } from 'react-native-track-player';


export const getSounds = () => {
    return new Promise(async (resolve, reject) => {
        try {
            if (Platform.OS === "web") return []

            await requestPermissions()
            const sounds = getAssets()
            resolve(sounds)
        } catch (e) {
            reject(e)
        }
    })
}

export const setupTrackPlayer = async () => {
    await TrackPlayer.setupPlayer()

    await TrackPlayer.updateOptions({
        stopWithApp: true,
        capabilities: [
            Capability.Play,
            Capability.Pause,
            Capability.SkipToNext,
            Capability.SkipToPrevious,
            Capability.Stop
        ],
        compactCapabilities: [
            Capability.Play,
            Capability.Pause,
        ]
    });

    await TrackPlayer.setRepeatMode(RepeatMode.Queue)
}

export const generateTrackPlayerSongsFormat = (array) => {
    return array.map(({ uri, filename, duration }) => {
        const title = filename.split(".")
        title.pop()

        let artwork

        return {
            url: uri,
            title: title.join(''),
            duration,
            artwork
        }
    })
}


export const alternateMute = async () => {
    const volume = await TrackPlayer.getVolume()

    if (volume === 0) {
        await TrackPlayer.setVolume(1)
        return 1
    } else {
        await TrackPlayer.setVolume(0)
        return 0
    }
}

export const isLooping = async () => {
    const loop = await TrackPlayer.getRepeatMode()

    return loop === RepeatMode.Queue
}

export const alternateLoop = async () => {
    const loop = await TrackPlayer.getRepeatMode()

    if (loop === RepeatMode.Queue) {
        await TrackPlayer.setRepeatMode(RepeatMode.Track)
        return true
    } else {
        await TrackPlayer.setRepeatMode(RepeatMode.Queue)
        return false
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
