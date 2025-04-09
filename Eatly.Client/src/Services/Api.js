import axios from "axios"
import { getAccessToken, isRefreshInProgress, onTokenRefreshed, resetTokenState, setAccessToken, setRefreshingStatus, subscribeToTokenRefresh } from '../Utils/TokenManager'
import { getOrGenerateDeviceId } from './../Utils/GenerateDeviceId';
import { setCurrentUsername } from './../Utils/UserStore';

const API_BASE_URL = "http://localhost:5015/api/";

const api = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
})

let interceptorsInitialized = false

export const setupAuthInterceptors = (auth) => {
    if(interceptorsInitialized) return;

    api.interceptors.request.use(config => {
        const token = getAccessToken() || auth.token
        if(token && !config.url.includes('refresh-token')) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    }, error => Promise.reject(error))

    api.interceptors.response.use(response => response, async error => {
        const originalRequest = error.config
        const shouldAttemptRefresh = 
            error.response?.status === 401 &&
            !originalRequest._retry &&
            (getAccessToken() || auth.token) &&
            !originalRequest.url.includes('refresh-token')

        if(!shouldAttemptRefresh) {
            return Promise.reject(error)
        }

        if(isRefreshInProgress()) {
            return new Promise(resolve => {
                subscribeToTokenRefresh(token => {
                    originalRequest.headers.Authorization = `Bearer ${token}`
                    resolve(api(originalRequest))
                })
            })
        }

        originalRequest._retry = true
        setRefreshingStatus(true)

        try{
            const deviceId = getOrGenerateDeviceId()

            const response = await api.post('/account/refresh-token',{
                deviceId
            })

            const {token, userName: refreshedUserName, email, roles = [], expiresAt  } = response.data
            
            setCurrentUsername(refreshedUserName)
            setAccessToken(token)

            const user = { userName: refreshedUserName, email, roles}
            auth.login(user, token, expiresAt)

            onTokenRefreshed(token)
            originalRequest.headers.Authorization = `Bearer ${token}`
            return api(originalRequest)
        }
        catch(error) {
            console.log('Token refresh failed',error)
            auth.logout()
            return Promise.reject(error)
        } finally {
            setRefreshingStatus(false)
        }
    })

    interceptorsInitialized = true
}

export const resetInterceptorStatus = () => {
    interceptorsInitialized = false
    resetTokenState()
}

export default api