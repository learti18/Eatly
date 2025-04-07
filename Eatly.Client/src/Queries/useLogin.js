import { useMutation } from '@tanstack/react-query';
import { useAuth } from '../Hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import api from '../Services/Api';
import { STATUS } from '../Utils/AuthStatus';
import { getOrGenerateDeviceId } from '../Utils/GenerateDeviceId';
import { setCurrentUsername } from '../Utils/UserStore';

const useLogin = () => {
   const { login, setAuthenticationStatus } = useAuth()
   const navigate = useNavigate()

   return useMutation({
        mutationFn: async({username, password}) => {
            setAuthenticationStatus(STATUS.PENDING)

            const deviceId = getOrGenerateDeviceId()
            const response = await api.post("/account/login", {username, password, deviceId})

            if(!response?.data) {
                throw new Error("Invalid response from server")
            }

            return response.data
        },
        onSuccess: ({userName, email, token, expiresAt, roles }) => {
            if(!token || !expiresAt){
                throw new Error("Missing token or expiration time")
            }

            setCurrentUsername(userName)

            login({ userName, email, roles: roles || [] }, token, expiresAt)
            setAuthenticationStatus(STATUS.SUCCEEDED)
            navigate('/')
        },
        onError: (error) => {
            console.error("Login failed: ",error)
            setAuthenticationStatus(STATUS.FAILED)

            alert(error?.response?.data?.error?.message || "Login failed - please try again");
        }
   })
};

export default useLogin;