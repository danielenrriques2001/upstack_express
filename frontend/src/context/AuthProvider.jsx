import { createContext, useEffect, useState } from "react";
import axiosClient from "../config/AxiosConfig";


const AuthContext = createContext();

const AuthProvider = ({children}) => {

    
    const [auth, setAuth] = useState({});

    useEffect(() => {

        const AuthUser = async () => {
            const token = localStorage.getItem('token');

            if(!token) {
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
                
              console.log('data--------------', response)
              setAuth(data)

            } catch (error) {
                console.log(error)
            }

            
        }

        AuthUser();

        


    }, [])
    

    return (
        <AuthContext.Provider
            value={{
                setAuth
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