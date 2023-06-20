import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import UseProject from "../hooks/UseProject"
import Modal from '../components/Modal'
import FormTask from '../components/FormTask'
import ModalDelete from "../components/ModalDelete";
import Task from "../components/Task";
import Alert from "../components/Alert";
import Collaborator from "../components/Collaborator";
import ModalDeleteCollaborator from "../components/ModalDeleteCollaborator";
import UseAdmin from "../hooks/UseAdmin";
import UseAuth from "../hooks/UseAuth";
import io from 'socket.io-client'

let socket; 

const Project = () => {

  const {
    getProject, 
    project, 
    loading, 
    setLoading, 
    modal, 
    handleCloseModal, 
    handleOpenModal, 
    handleDeleteTask, 
    modalDelete, 
    Notify,
    handleSocketCreateTask,
    handleSocketDeleteTask,
    handleSocketEditTask,
    handleSocketChangeStatus
    } = UseProject();

  const params = useParams(); 
  const admin = UseAdmin();
   



  useEffect(() => {
      setLoading(true)
      getProject(params.id)
  }, [])

  useEffect(() => {
    socket = io(import.meta.env.VITE_BACKEND_URL),
    socket.emit('open project', params.id);

  }, [])

  useEffect(() => {

    socket.on('task added', (newTask) => {
              handleSocketCreateTask(newTask)
    })

    socket.on('task deleted', (deletedTask) => {
         handleSocketDeleteTask(deletedTask)
    })

    socket.on('task edited', (editedTask) => {

        handleSocketEditTask(editedTask)
    })

    socket.on('status changed', (task) => {

      handleSocketChangeStatus(task)
  
   
  })

  

  })
  
  

  const {message} = Notify;
  


  if(loading) return (
    <div class="border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
  <div class="animate-pulse flex space-x-4">
    <div class="rounded-full bg-slate-700 h-10 w-10"></div>
    <div class="flex-1 space-y-6 py-1">
      <div class="h-2 bg-slate-700 rounded"></div>
      <div class="space-y-3">
        <div class="grid grid-cols-3 gap-4">
          <div class="h-2 bg-slate-700 rounded col-span-2"></div>
          <div class="h-2 bg-slate-700 rounded col-span-1"></div>
        </div>
        <div class="h-2 bg-slate-700 rounded"></div>
      </div>
    </div>
  </div>
</div>
  )

  return (
    message & Notify?.error ? <Alert alert={Notify}/> : (

    <>
    <div className="flex justify-between">
        <h1 className="font-black text-5xl text-gray-700">{project?.name}</h1>
       
        {/* <p className="text-2xl font-thin text-gray-500 ">{project?.costumer}</p> */}

        {
          admin && <div className="flex">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
          </svg>
  
          <Link
            to={`/projects/edit/${params?.id}`}
  
          >
            Edit 
          </Link>
  
      
  
          </div>
        }

        

    </div>

    {admin && <button
    type="submit"
    className="text-sm px-10 py-3 w-full md:w-auto rounded-lg uppercase font-bold bg-sky-400 text-white text-center mt-5 flex gap-2 justify-center items-center "
    onClick={() => {handleOpenModal()}}
    >

      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>

    New Task

    </button>}


    <p  className="font-bold text-xl mt-10" >
      Task's List
    </p>
    <div className="bg-white shadow mt-10 rounded-lg">

      {
        message && <Alert alert={Notify}/>
      }

      {
        project?.tasks?.length ? 
        
          project?.tasks?.map( task => (
            <Task
              key={task._id}
              task ={task}
            />
          ))
        
        : 
        <p className="text-center my-5 p-10">Not Tasks found!</p>
      }


    </div>

   { admin && <>
    <div className="flex justify-between items-center">

    <p  className="font-bold text-xl mt-10 " >
      Collaborators
    </p>

    

    <div className="flex gap-1">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
    </svg>


        <Link
          to={`/projects/new-collaborator/${project._id}`}

        >
         Add New
        </Link>

    

        </div>



    </div>

    {
       admin && project?.collaborators?.length ? 
        
          project?.collaborators?.map( co => (
            <Collaborator
              key={co._id}
              collaborator ={co}
            />
          ))
        
        : 
        <p className="text-center my-5 p-10">Not Collaborator found!</p>
      }

</>

}
    <Modal 
          modal = {modal}
          handleCloseModal = {handleCloseModal}
    >
          <FormTask

          
          />
    </Modal>

    <ModalDelete/>

    <ModalDeleteCollaborator/>

    </>)
  )
}

export default Project