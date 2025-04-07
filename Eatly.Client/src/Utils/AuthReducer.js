import { STATUS } from "./AuthStatus"

export const initialState = {
    user: {},
    token: null,
    expiresAt: null,
    isAuthenticated: false,
    status: STATUS.IDLE,
};

export const AuthReducer = (state,action) => {
    switch (action.type){
        case 'login':
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                status: STATUS.SUCCEEDED,
            }
        case 'logout':
            return { ...initialState }
        case 'updateUser':
            return { ...state, user: action.payload }
        case 'status':
            return { ...state, status: action.payload }
        default:
            throw new Error(`Unhandled action type: ${action.type}`)
    }
}