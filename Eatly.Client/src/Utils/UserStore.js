let currentEmail = null;
let currentUser = null;

export const setCurrentEmail = (email) => {
    currentEmail = email;
}

export const setCurrentUser = (user) => {
    currentUser = user;
}
export const getCurrentUser = () => {
    return currentUser;
}
export const getCurrentEmail = () => {
    return currentEmail;
}

export const clearCurrentEmail = () => {
    currentEmail = null;
}
export const clearCurrentUser = () => {
    currentUser = null;
}

export const hasAuthenticatedSession = () => {
    return !!currentEmail;
}