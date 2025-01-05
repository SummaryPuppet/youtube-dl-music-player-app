import { storage } from "../storage/storage"

const PLAYLISTS_KEY = 'playlists'

export const savePlaylist = async (name, tracks) => {
    const playlists = await getPlaylists()
    playlists[name] = tracks

    await storage.setObject(PLAYLISTS_KEY, playlists)
}

export const getPlaylists = async () => {
    const playlists = await storage.getObject(PLAYLISTS_KEY)
    return playlists || {}
}