import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../Hooks/useAuth"
import api from "../../Services/Api"
import { getOrGenerateDeviceId } from "../../Utils/GenerateDeviceId"
import { setCurrentEmail } from "../../Utils/UserStore"
import { STATUS } from "../../Utils/AuthStatus"
import { toast } from "sonner"

const useRegister = () => {
    const { login, setAuthenticationStatus } = useAuth()
    const navigate = useNavigate()

    return useMutation({
        mutationFn: async (credentials) => {
            const registerData = {
                ...credentials,
                deviceId: getOrGenerateDeviceId()
            }

            const { data } = await api.post("/web/auth/register", registerData)
            return data
        },
        onSuccess: async ({ userName, email, token, expiresAt, roles }) => {
            if(!token || !expiresAt) {
                throw new Error("Missing token or expiration time")
            }

            setCurrentEmail(userName)
            login({ userName, email, roles: roles || [] }, token, expiresAt)
            setAuthenticationStatus(STATUS.SUCCEEDED)

            if(roles?.includes("Restaurant")) {
                navigate("/restaurant-profile", { 
                    replace: true,
                    state: { from: "/restaurant-signup" }
                })
            } else if(roles?.includes("Admin")) {
                navigate("/dashboard", { replace: true })
            } else {
                navigate("/", { replace: true })
            }
            toast.success("Registration successful", {
                description: "Welcome aboard!",
                duration: 3000
            });
        },
        onError: (error) => {
            setAuthenticationStatus(STATUS.FAILED)
            toast.error("Registration failed", {
                description: error.response?.data?.message || "An error occurred during registration",
                duration: 5000
            });
            console.error("Registration failed: ", error.response?.data || error)
        }
    })
}

export default useRegister;