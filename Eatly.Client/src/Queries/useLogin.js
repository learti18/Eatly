import { useMutation } from '@tanstack/react-query';
import { useAuth } from '../Hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import api from '../Services/Api';
import { STATUS } from '../Utils/AuthStatus';
import { getOrGenerateDeviceId } from '../Utils/GenerateDeviceId';
import { setCurrentEmail } from '../Utils/UserStore';

const useLogin = () => {
   const { login, setAuthenticationStatus } = useAuth()
   const navigate = useNavigate()

   return useMutation({
        mutationFn: async({email, password}) => {
            setAuthenticationStatus(STATUS.PENDING)
            
            const deviceId = getOrGenerateDeviceId()
            console.log('About to send login request with:', {email: email, password: '***', deviceId});
            const response = await api.post("/web/auth/login", {email, password, deviceId})
            
            if(!response?.data) {
                throw new Error("Invalid response from server")
            }

            return response.data
        },
        onSuccess: async ({ email, token, expiresAt, roles }) => {
            if(!token || !expiresAt){
                throw new Error("Missing token or expiration time")
            }

            setCurrentEmail(email)
            login({ email, roles: roles || [] }, token, expiresAt)
            setAuthenticationStatus(STATUS.SUCCEEDED)

            if(roles?.includes("Restaurant")) {
                try {
                    const { data: restaurantData } = await api.get("/restaurants/me")
                    
                    if (!restaurantData) {
                        navigate("/restaurant-profile", { replace: true })
                    } else if (!restaurantData.isVerified) {
                        navigate("/restaurant-verification", { replace: true })
                    } else {
                        navigate("/restaurant-dashboard", { replace: true })
                    }
                } catch (error) {
                    console.error("Error fetching restaurant data:", error)
                    navigate("/restaurant-profile", { replace: true })
                }
            } else if(roles?.includes("Admin")) {
                navigate("/dashboard", { replace: true })
            } else {
                navigate("/", { replace: true })
            }
        },
        onError: (error) => {
            console.error("Login failed: ",error)
            setAuthenticationStatus(STATUS.FAILED)

            alert(error?.response?.data?.error?.message || "Login failed - please try again");
        }
   })
};

export default useLogin;