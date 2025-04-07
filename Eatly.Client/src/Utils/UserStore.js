let currentUsername = null;
let currentUser = null;

const AUTH_STATUS_KEY = 'auth_status'

export const setCurrentUsername = (username) => {
    currentUsername = username
    localStorage.setItem(AUTH_STATUS_KEY,'true')
}

export const setCurrentUser = (user) => {
    currentUser = user;
}
export const getCurrentUser = () => {
    return currentUser;
}
export const getCurrentUserName = () => {
    return currentUsername
}

export const clearCurrentUsername = () => {
    currentUsername = null
    localStorage.removeItem(AUTH_STATUS_KEY)
}
export const clearCurrentUser = () => {
    currentUser = null
}

export const hasAuthenticatedSession = () => {
    return localStorage.getItem(AUTH_STATUS_KEY) === 'true'
}