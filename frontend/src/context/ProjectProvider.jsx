import { createContext, useEffect, useState } from "react";
import axiosClient from "../config/AxiosConfig";
import { useNavigate } from "react-router-dom";


const ProjectContext = createContext();

const ProjectProvider = ({children}) => {

    
    const [projects, setProjects] = useState([]);

    // useEffect(() => {

    //     const ProjectUser = async () => {
    //         const token = localStorage.getItem('token');

    //         if(!token) {
    //             setloading(false)
    //             return 
    //         }

    //         const config = {
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 Projectorization: `Bearer ${token}`
    //             }
    //         }

    //         try {
    //           const response = await axiosClient('/users/profile', config);
                
    //           console.log('data--------------', response)
    //           setProject(response.data)
    //           navigate('/projects')

    //         } catch (error) {
    //            setProject({})
    //         } finally {
    //             setloading(false)
    //         }

            
    //     }

    //     ProjectUser();

        


    // }, [])
    

    return (
        <ProjectContext.Provider
            value={{
                projects
            }}
        >

            {children}
        </ProjectContext.Provider>
    )

}

export {
    ProjectProvider
}

export default ProjectContext;