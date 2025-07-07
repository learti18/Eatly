import { getOrGenerateDeviceId } from "../Utils/GenerateDeviceId"
import api from './Api';

// Debug function to check cookie availability
const debugCookieStatus = () => {
    const allCookies = document.cookie;
    const hasRefreshToken = allCookies.includes('refreshToken');
    console.log('Cookie debug:', {
        allCookies,
        hasRefreshToken,
        userAgent: navigator.userAgent,
        isSecureContext: window.isSecureContext,
        location: window.location.href
    });
    return hasRefreshToken;
};

export const authenticateWithStoredCredentials = async (email = null, retryCount = 0) => {
    try {
        // Debug: Check if we can see cookies on frontend
        const hasCookie = debugCookieStatus();
        console.log(`Auth attempt ${retryCount + 1}, has cookie: ${hasCookie}`);
        
        return await api.post('/web/auth/refresh-token', {
            deviceId: getOrGenerateDeviceId(),
            accessToken: null 
        });
    } catch (error) {
        console.error(`Auth attempt ${retryCount + 1} failed:`, error.response?.data);
        
        // If no refresh token found, try a few strategies
        if (error.response?.status === 401 && 
            error.response?.data?.message?.includes('No refresh token found')) {
            
            // Strategy 1: Retry once with a small delay (cookie might be delayed)
            if (retryCount < 1) {
                console.log('Retrying auth after delay...');
                await new Promise(resolve => setTimeout(resolve, 100));
                return authenticateWithStoredCredentials(email, retryCount + 1);
            }
            
            // Strategy 2: If still no cookie, clear local storage and log out
            console.log('No refresh token available after retry - clearing auth state');
            localStorage.removeItem('auth_status');
            throw new Error('REFRESH_TOKEN_MISSING');
        }
        
        // For other auth errors, don't retry
        if (error.response?.status === 401) {
            console.log('Refresh token invalid - clearing auth state');
            localStorage.removeItem('auth_status');
            throw new Error('REFRESH_TOKEN_INVALID');
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