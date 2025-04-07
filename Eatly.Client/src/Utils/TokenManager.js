let currentToken = null
let isRefreshing = false
let refreshSubscribers = []

/**
 * Set the current access token
 * @param {string} token - JWT token
 */
export const setAccessToken = (token) => {
    currentToken = token
}

/**
 * Get the current access token
 * @returns {string|null} Current token
 */
export const getAccessToken = () => currentToken

/**
 * Subscribe to token refresh events
 * @param {Function} callback - Function to call when token is refreshed
 */
export const subscribeToTokenRefresh = (callback) => {
    refreshSubscribers.push(callback)
}

/**
 * Notify all subscribers that token has been refreshed
 * @param {string} token - New JWT token
 */
export const onTokenRefreshed = (token) => {
    refreshSubscribers.forEach(callback => callback(token))
    refreshSubscribers = []
}

/**
 * Set refresh in progress status
 * @param {boolean} status - Whether refresh is in progress
 */
export const setRefreshingStatus = (status) => {
    isRefreshing = status
}

/**
 * Check if token refresh is in progress
 * @returns {boolean} Refresh status
 */
export const isRefreshInProgress = () => isRefreshing

export const resetTokenState = () => {
    currentToken = null;
    isRefreshing = false;
    refreshSubscribers = [];
}