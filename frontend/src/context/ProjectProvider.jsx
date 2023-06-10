import { createContext, useEffect, useState } from "react";
import axiosClient from "../config/AxiosConfig";
import { useNavigate } from "react-router-dom";


const ProjectContext = createContext();

const ProjectProvider = ({children}) => {

    
    const [projects, setProjects] = useState([]);
    const [Notify, SetNotify] = useState({});
    const navigate = useNavigate();


    const handleNotify = notify => {
        SetNotify(notify)

        setTimeout(() => {
            SetNotify({})
        }, 3000);
    }


    const submitProject = async project => {

        try {

            const token = localStorage.getItem('token');

            if(!token) return 

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

       
              const response = await axiosClient.post('/projects', project, config);
                
              handleNotify({
                message: 'Project has been created, Yupi....!',
                error: false,
            })

            setTimeout(() => {
                SetNotify({})
                useNavigate('/projects')
            }, 3000);

            
      
    
            
        } catch (error) {
            console.log(error)
        }

    }

    return (
        <ProjectContext.Provider
            value={{
                projects,
                setProjects,
                submitProject,
                Notify,
                handleNotify
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