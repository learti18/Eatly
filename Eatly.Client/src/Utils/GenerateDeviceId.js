export function getOrGenerateDeviceId() {
    return localStorage.getItem('deviceId') || generateDeviceId()
}

export function generateDeviceId() {
    const deviceId = Math.random().toString(36).substring(2, 15) +
                     Math.random().toString(36).substring(2, 15);
    localStorage.setItem('deviceId',deviceId)
    return deviceId
}