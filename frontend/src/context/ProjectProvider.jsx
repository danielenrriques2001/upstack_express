import { createContext, useEffect, useState } from "react";
import axiosClient from "../config/AxiosConfig";
import { useNavigate } from "react-router-dom";


const ProjectContext = createContext();

const ProjectProvider = ({children}) => {

    
    const [projects, setProjects] = useState([]);
    const [project, setProject] = useState({});
    const [loading, setLoading] = useState(true);
    const [Notify, SetNotify] = useState({});
    const navigate = useNavigate();


    const handleNotify = notify => {
        SetNotify(notify)

        setTimeout(() => {
            SetNotify({})
        }, 3000);
    }

    useEffect(() => {

        const getProjects = async () => {
            const token = localStorage.getItem('token');

            if(!token) return 

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            try {
              const response = await axiosClient('/projects', config);
              setProjects(response.data)
        
            } catch (error) {
              console.log(error)
            } 
            
        }

        getProjects();

        


    }, [])

    


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

            if(!project.id) {
              const data = await newProject(project, config);

              console.log('new project -----------', data)
 
            } else {
                const data = await editProject(project, config);
              
                
            }
  
        } catch (error) {
            console.log(error)
        }

    }

    const editProject = async (project, config) => {


            const response = await axiosClient.put(`/projects/${project.id}`, project, config);

            handleNotify({
                message: 'Project has been edited, Yupi....!',
                error: false,
            })

          
            const updatedProjects = projects.map(item => item._id === response?.data._id ? response?.data : item);

            setProjects(updatedProjects);

            return response?.data;

    }
    const newProject = async (project, config) => {

      
            const response = await axiosClient.post('/projects', project, config);

            handleNotify({
                message: 'Project has been created, Yupi....!',
                error: false,
            })

            setProjects([...projects, project])


            return response?.data;


        
    }
    

    const getProject = async id => {

        setLoading(true)
        const token = localStorage.getItem('token');
       

        if(!token) return 

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
          const response = await axiosClient(`/projects/${id}`, config);

         setProject(response.data)
    
        } catch (error) {
          console.log(error)
        } finally {
            setLoading(false)
        }
        
    }


    return (
        <ProjectContext.Provider
            value={{
                projects,
                setProjects,
                submitProject,
                Notify,
                handleNotify,
                getProject, 
                project,
                loading,
                 setLoading
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