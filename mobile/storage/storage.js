import AsyncStorage from '@react-native-async-storage/async-storage'

const set = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, value)
    } catch (e) {
        console.error(e)
    }
}

const setObject = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(value))
    } catch (e) {
        console.error(e)
    }
}

const getString = async (key) => {
    const value = AsyncStorage.getItem(key)

    return value
}

const getObject = async (key) => {
    const value = AsyncStorage.getItem(key)
    try {
        console.log(value)
        return JSON.parse(value)
    } catch (_) {
        return {}
    }
}

export const storage = {
    set,
    setObject,
    getString,
    getObject
}