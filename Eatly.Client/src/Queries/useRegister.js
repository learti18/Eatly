import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../Hooks/useAuth"
import api from "../Services/Api"
import { getOrGenerateDeviceId } from "../Utils/GenerateDeviceId"
import { setCurrentUsername } from "../Utils/UserStore"
import { STATUS } from "../Utils/AuthStatus"

const useRegister = () => {
    const { login, setAuthenticationStatus } = useAuth()
    const navigate = useNavigate()

    return useMutation({
        mutationFn: async (credentials) => {
            const registerData = {
                ...credentials,
                deviceId: getOrGenerateDeviceId()
            }

            const { data } = await api.post("/account/register", registerData)
            return data
        },
        onSuccess: async ({ userName, email, token, expiresAt, roles }) => {
            if(!token || !expiresAt) {
                throw new Error("Missing token or expiration time")
            }

            setCurrentUsername(userName)

            login({ userName, email, roles: roles || [] }, token, expiresAt)
            setAuthenticationStatus(STATUS.SUCCEEDED)
            navigate("/")
        },
        onError: (error) => {
            setAuthenticationStatus(STATUS.FAILED)
            console.error("Registration failed: ", error.response?.data || error)
        }
    })
}

export default useRegister;