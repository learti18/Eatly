import { useAuth } from "../../Hooks/useAuth"
import { useNavigate } from "react-router-dom"
import { useMutation } from "@tanstack/react-query"
import { getOrGenerateDeviceId } from "../../Utils/GenerateDeviceId"
import api, { resetInterceptorStatus } from "../../Services/Api"
import { clearCurrentEmail, clearCurrentUser } from "../../Utils/UserStore"

const useLogout = () => {
    const { logout } = useAuth()
    const navigate = useNavigate()

    return useMutation({
        mutationFn: async () => {
            const deviceId = getOrGenerateDeviceId()

            try{
                await api.post("/web/auth/logout", { deviceId })
            }catch (error) {
                console.error("Logout failed", error)
                throw error
            }
        },
        onSuccess: () => {
            clearCurrentEmail()
            clearCurrentUser()
            resetInterceptorStatus()
            logout()
            navigate("/sign-in")
        },
        onError: (error) => {
            console.error("Logout failed: ", error)

            logout()
        }
    })
}

export default useLogout;