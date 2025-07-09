import { useMutation } from '@tanstack/react-query';
import { useAuth } from '../../Hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import api from '../../Services/Api';
import { STATUS } from '../../Utils/AuthStatus';
import { getOrGenerateDeviceId } from '../../Utils/GenerateDeviceId';
import { setCurrentEmail } from '../../Utils/UserStore';
import { initializeFirebaseAuth } from '../../Services/FirebaseService';
import { toast } from 'sonner';

const useLogin = () => {
   const { login, setAuthenticationStatus } = useAuth()
   const navigate = useNavigate()

   return useMutation({
        mutationFn: async (credentials) => {
            const loginData = {
                ...credentials,
                deviceId: getOrGenerateDeviceId()
            }

            const { data } = await api.post("/web/auth/login", loginData)
            return data
        },
        onSuccess: async ({ email, token, expiresAt, roles, firebaseToken }) => {
            if(!token || !expiresAt){
                throw new Error("Missing token or expiration time")
            }

            // Initialize Firebase with the custom token
            if (firebaseToken) {
                try {
                    await initializeFirebaseAuth(firebaseToken);
                } catch (error) {
                    console.error('Failed to initialize Firebase:', error);
                    // Continue with regular auth even if Firebase fails
                }
            }

            setCurrentEmail(email)
            login({ email, roles: roles || [] }, token, expiresAt, firebaseToken)
            setAuthenticationStatus(STATUS.SUCCEEDED)

            if(roles?.includes("Restaurant")) {
                // Always redirect to profile creation first
                navigate("/restaurant-profile", { replace: true })
            } else if(roles?.includes("Admin")) {
                navigate("/dashboard", { replace: true })
            } else if(roles?.includes("DeliveryDriver")) {
                navigate("/driver-dashboard", { replace: true })
            }else {
                navigate("/", { replace: true })
            }
            toast.success("Login successful", {
                description: "Welcome back!",
                duration: 3000
            });
        },
        onError: (error) => {
            console.error("Login failed: ",error)
            setAuthenticationStatus(STATUS.FAILED)
        }
   })
};

export default useLogin;