import { createContext, useEffect, useState } from "react";
import axiosClient from "../config/AxiosConfig";
import { useNavigate } from "react-router-dom";


const ProjectContext = createContext();

const ProjectProvider = ({children}) => {

    
    const [projects, setProjects] = useState([]);

    const [project, setProject] = useState({});

    const [loading, setLoading] = useState(true);

    const [Notify, SetNotify] = useState({});
    
    const [modal, setModal] = useState(false);

    const [task, setTask] = useState({});

    const [modalDelete, setModalDelete] = useState(false);
    
    const [collaborator, setCollaborator] = useState({})


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

            
 
            } else {
                const data = await editProject(project, config);
              
                
            }
            setTimeout(() => {
                navigate('/projects')    
              }, 1000);
          
  
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

    const deleteProject = async id => {

        const token = localStorage.getItem('token');

        if(!token) return 

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const response = await axiosClient.delete(`/projects/${id}`,config);

            console.log(response)

            handleNotify({
                message: response?.data?.message,
                error: false,
            })

            setTimeout(() => {
                SetNotify({})
                navigate('/projects')
            }, 3000);

          
            const updatedProjects = projects.filter(item => item._id !== id);

            setProjects(updatedProjects)

            // setProjects(updatedProjects);

            // return response?.data;
    
        } catch (error) {
          console.log(error)
        } 

    }

    const createTask = async task => {

    

        try {

            const token = localStorage.getItem('token');
            if(!token) return 

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            if(!task.id) {
                const { data } = await axiosClient.post('/tasks', task, config);

                handleNotify({
                    message: data.message,
                    error: false,
                })

                const updatedProject = {...project};
                updatedProject.tasks = [data.data, ...project.tasks, ];

                setProject(updatedProject)
                SetNotify({})
                setModal(false)

                
            } else {
                const { data } = await axiosClient.put(`/tasks/${task.id}`, task, config);

                const updatedProject = {...project};
                updatedProject.tasks = [data.data, ...project.tasks, ];

                setProject(updatedProject)
                SetNotify({})
                setModal(false)
            }   
          
        
                const updatedProject = {...project};
                updatedProject.tasks = [data.data, ...project.tasks, ];

                setProject(updatedProject)
                SetNotify({})
                setModal(false)

        } catch (error) {
            console.log(error)
        }

     


    }
    const editTask = async task => {

        setTask(task)
        setModal(true)
        setIsEditing(true)

    }

    const handleCloseModal = () => {

        setModal(false);
        setTask({});

    }

    const handleOpenModal = () => {

        setModal(true);
       

    }

    const handleDeleteTask = (task) => {
        setModalDelete(true)
        setTask(task)
    }

    const handleCloseModalTask = () => {
        setModalDelete(false)
    }


    const deleteTask = async () => {
        const token = localStorage.getItem('token');

        if(!token) return 

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const response = await axiosClient.delete(`/tasks/${task._id}`,config);

            console.log(response)

            handleNotify({
                message: response?.data?.message,
                error: false,
            })

           


          
            handleCloseModalTask();
            setTask({});


            const updatedProject = {...project} 

            updatedProject.tasks = updatedProject.tasks.filter(taskState => taskState._id !== task._id);

            setProject(updatedProject);

    
        } catch (error) {
          console.log(error)
        } 
    }

    const handleSubmitCollaborator = async email => {

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
            const {data} = await axiosClient.post('/projects/collaborators', {email}, config)
           setCollaborator(data)
           SetNotify({})
        } catch (error) {


            handleNotify({
                message: error.response.data.message,
                error: true, 
            })
        } finally {
            setLoading(false)
        }


        

    }

    const handleAddCollaborator = async email => {

        const token = localStorage.getItem('token');

        if(!token) return 

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const {data} = await axiosClient.post(`/projects/collaborators/${project._id}`, {email}, config)

            

           

            handleNotify({
                message: data?.message,
                error: false,
            })

         

           
    
        } catch (error) {
            handleNotify({
                message: error?.response?.data?.message,
                error: true,
            })
        } finally {
            setCollaborator({})
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
                 setLoading,
                 deleteProject,
                modal, 
                handleOpenModal,
                handleCloseModal,
                createTask,
                editTask,
                task,
                modalDelete,
                handleDeleteTask,
                handleCloseModalTask,
                deleteTask,
                handleSubmitCollaborator,
                collaborator,
                handleAddCollaborator
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