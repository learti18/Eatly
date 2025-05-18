let currentEmail = null;
let currentUser = null;

const AUTH_STATUS_KEY = 'auth_status'

export const setCurrentEmail = (email) => {
    currentEmail = email
    localStorage.setItem(AUTH_STATUS_KEY,'true')
}

export const setCurrentUser = (user) => {
    currentUser = user;
}
export const getCurrentUser = () => {
    return currentUser;
}
export const getCurrentEmail = () => {
    return currentEmail
}

export const clearCurrentEmail = () => {
    currentEmail = null
    localStorage.removeItem(AUTH_STATUS_KEY)
}
export const clearCurrentUser = () => {
    currentUser = null
}

export const hasAuthenticatedSession = () => {
    return localStorage.getItem(AUTH_STATUS_KEY) === 'true'
}