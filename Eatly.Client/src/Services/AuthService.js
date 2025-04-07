import { getOrGenerateDeviceId } from "../Utils/GenerateDeviceId"
import api from './Api';


export const authenticateWithStoredCredentials =  async (username = null) => {
    return await api.post('/account/refresh-token', {
        deviceId: getOrGenerateDeviceId(),
        accessToken: null 
      });
}

export const refreshAuthToken = async () => {
    return await api.post('/account/refresh-token', {
        deviceId: getOrGenerateDeviceId()
    })
}

export const calculateRefreshTime = (expiresAt, buffer = 3000) => {
    const expiresAtTime = new Date(expiresAt).getTime()
    return Math.max(expiresAtTime - Date.now() - buffer, 0)
}

export const formatUserData = (data) => {
    return {
        userName: data.userName,
        email: data.email,
        roles: data.roles || []
    }
}