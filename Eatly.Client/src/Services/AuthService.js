import { getOrGenerateDeviceId } from "../Utils/GenerateDeviceId"
import api from './Api';


export const authenticateWithStoredCredentials = async (email = null, retryCount = 0) => {
    try {
        return await api.post('/web/auth/refresh-token', {
            deviceId: getOrGenerateDeviceId(),
            accessToken: null 
        });
    } catch (error) {
        // If no refresh token found and this is the first attempt, retry once after a short delay
        if (error.response?.status === 401 && 
            error.response?.data?.message?.includes('No refresh token found') && 
            retryCount < 1) {
            await new Promise(resolve => setTimeout(resolve, 100)); // Wait 100ms
            return authenticateWithStoredCredentials(email, retryCount + 1);
        }
        throw error;
    }
}

export const refreshAuthToken = async () => {
    return await api.post('/web/auth/refresh-token', {
        deviceId: getOrGenerateDeviceId()
    })
}

export const calculateRefreshTime = (expiresAt, buffer = 3000) => {
    const expiresAtTime = new Date(expiresAt).getTime()
    return Math.max(expiresAtTime - Date.now() - buffer, 0)
}

export const formatUserData = (data) => {
    return {
        email: data.email,
        roles: data.roles || []
    }
}