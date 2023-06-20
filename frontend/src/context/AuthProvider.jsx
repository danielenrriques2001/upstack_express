import { createContext, useEffect, useState } from "react";
import axiosClient from "../config/AxiosConfig";
import { useNavigate } from "react-router-dom";


const AuthContext = createContext();

const AuthProvider = ({children}) => {

    
    const [auth, setAuth] = useState({});
    const [loading, setloading] = useState(true);
    const navigate = useNavigate();

    const AuthUser = async () => {
        const token = localStorage.getItem('token');

        if(!token) {
            setloading(false)
            return 
        }

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
          const response = await axiosClient('/users/profile', config);
          
          setAuth(response.data);
          navigate('/projects')
    
        
        
        }
         catch (error) {
           setAuth({})
        } finally {
            setloading(false)
          
        }

        
    }

    useEffect(() => {
        AuthUser();
    }, [])


    const CloseSectionAuth = () => {
        setAuth({});
    }
    

    return (
        <AuthContext.Provider
            value={{
                setAuth,
                auth,
                loading,
                CloseSectionAuth,
                AuthUser
            }}
        >

            {children}
        </AuthContext.Provider>
    )

}

export {
    AuthProvider
}

export default AuthContext;