import * as Notifications from 'expo-notifications'

export const sendNotification = async ({ title = "", body = "", data, trigger = null }) => {
    await Notifications.scheduleNotificationAsync({
        content: {
            title, body, data
        },
        trigger
    })
}