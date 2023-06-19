import { createContext, useEffect, useState } from "react";
import axiosClient from "../config/AxiosConfig";
import { useNavigate } from "react-router-dom";
import io from 'socket.io-client'
let socket;

const ProjectContext = createContext();

const ProjectProvider = ({children}) => {

    
    const [projects, setProjects] = useState([]);

    const [project, setProject] = useState({});

    const [loading, setLoading] = useState(true);

    const [Notify, SetNotify] = useState({});
    
    const [modal, setModal] = useState(false);

    const [task, setTask] = useState({});

    const [modalDelete, setModalDelete] = useState(false);
    const [modalDeleteCollaborator, setModalDeleteCollaborator] = useState(false);
    
    const [collaborator, setCollaborator] = useState({});
    const [searcher, setSearcher] = useState(false);



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

    useEffect(() => {
        socket = io(import.meta.env.VITE_BACKEND_URL);

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

               
                SetNotify({})
                setModal(false)
                socket.emit('new task', data)

                
            } else {
                const { data } = await axiosClient.put(`/tasks/${task.id}`, task, config);

               

                setProject(updatedProject)
                SetNotify({})
                setModal(false)

                socket.emit('edit task', data)
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

           

            handleNotify({
                message: response?.data?.message,
                error: false,
            })

            handleCloseModalTask();
            setTask({});
            socket.emit('delete task', response.data?.task)

        

    
        } catch (error) {
          console.log(error)
        } 
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

    const handleDeleteCollaborator = async (collaborator) => {


        setModalDeleteCollaborator(!modalDeleteCollaborator);

        setCollaborator(collaborator);




    }

    const deleteCollaborator = async () => {

        const token = localStorage.getItem('token');

        if(!token) return 

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {

            
            const {data} = await axiosClient.post(`projects/delete-collaborators/${project._id}`, {id: collaborator._id} , config);


            handleNotify({
                message: data?.message,
                error: false,
            })
            
          


            const updatedProject = {...project} ;


            updatedProject.collaborators = updatedProject.collaborators.filter(collaboratorState => collaboratorState._id !== collaborator._id);

            setProject(updatedProject);

            handleDeleteCollaborator();            
            setCollaborator({});

    
        } catch (error) {
          console.log(error)
        } 




        
       
    }

    
    const completeTask = async (id) => {

        const token = localStorage.getItem('token');

        if(!token) return 

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const {data} = await axiosClient.post(`/tasks/status/${id}`, {}, config)

            



            handleNotify({
                message: data?.message,
                error: false,
            })

            const updatedProject = {...project} 

            updatedProject.tasks = updatedProject.tasks.map(taskState => taskState._id === data._id ? data : taskState);

            setProject(updatedProject);
            setTask({})
            SetNotify({})

            
        } catch (error) {
            
        }

    }

    const handleSearcher = () => {
        setSearcher(!searcher)
    }

    const handleSocketCreateTask = task => {

        const updatedProject = {...project};
        updatedProject.tasks = [task, ...project.tasks];

        setProject(updatedProject)



    }

    const handleSocketDeleteTask = task => {

        const updatedProject = {...project} 

        updatedProject.tasks = updatedProject.tasks.filter(taskState => taskState._id !== task._id);

        setProject(updatedProject);

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
                handleAddCollaborator,
                handleDeleteCollaborator,
                modalDeleteCollaborator,
                deleteCollaborator,
                completeTask,
                handleSearcher,
                searcher,
                handleSocketCreateTask,
                handleSocketDeleteTask
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