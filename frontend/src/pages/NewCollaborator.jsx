import { useParams } from "react-router-dom";
import FormCollaborator from "../components/FormCollaborator"
import UseProject from "../hooks/UseProject";
import { useEffect, useState } from "react";
import Alert from "../components/Alert";


const NewCollaborator = () => {

  const {getProject, project, collaborator, loading, handleAddCollaborator, Notify} = UseProject();
  console.log(collaborator)
  const params = useParams();
  


  useEffect(() => { 
      getProject(params.id)
  }, [])
  

  if(!project?._id) return <Alert alert={Notify}/>

  return (
    <>
    <h1 className='text-4xl font-black text-gray-700'>Add Collaborator: <span className=" font-extrabold text-gray-800">{project.name}</span></h1>

    <div className='mt-10 flex justify-center'>
        <FormCollaborator/>
    </div>

    {
      loading ? 'loading...' : collaborator?.user?._id && (
        <div  className="flex justify-center mt-10">
            <div className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow ">

              <h2 className="text-center mb-10 text-2xl font-bold">Result:</h2>

              <div className="flex justify-between items-center shadow-sm p-5 border rounded-3xl">
                <p className=" text-slate-900 font-bold capitalize flex justify-center items-center gap-1">
                  {collaborator?.user?.name}
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>

                  </p>

                <button
                  type="button"
                  className="bg-slate-500 px-5 py-2 rounded-lg uppercase text-white font-bold text-sm hover:bg-slate-900 transition-colors"
                  onClick={( ) => {handleAddCollaborator( collaborator?.user?.email )}}
                
                >

    

                 Send Request
                </button>

              </div>

            </div>
        </div>
      )
    }
    
    </>
  )
}

export default NewCollaborator