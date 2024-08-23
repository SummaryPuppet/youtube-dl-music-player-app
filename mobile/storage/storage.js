import AsyncStorage from '@react-native-async-storage/async-storage'

const set = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, value)
    } catch (e) {
        console.error(e)
    }
}

const getString = async (key) => {
    const value = AsyncStorage.getItem(key)

    return value
}

export const storage = {
    set,
    getString
}