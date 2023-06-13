import {useParams } from "react-router-dom"
import UseProject from "../hooks/UseProject"
import { useEffect, useState } from "react";
import ProjectForm from '../components/ProjectForm'
import ProjectInput from "../components/ProjectInput";
import Alert from "../components/Alert";
const EditProject = () => {

    const params = useParams()
    const {project, getProject, loading, submitProject, handleNotify, Notify, deleteProject} = UseProject();

    const [name, setName] = useState(project.name)
    const [description, setDescription] = useState(project.description)
    const [dispatchDate, setDispatchDate] = useState(project.dispatch_Date.split('T')[0])
    const [costumer, setCostumer] = useState(project.costumer)
    const [id, setId] = useState(project?._id);
    

    useEffect(() => {
        getProject(params.id)
    }, [])

    const handleSubmit = async (e) => {
      e.preventDefault();
  
      if([name, description, dispatchDate, costumer].includes('')) {
        handleNotify({
            message: 'All the fields are Mandatory!',
            error: true,
        })
  
        return
      }

    
  
      const response = await submitProject({id, name, description, dispatch_Date: dispatchDate, costumer});
  
      console.log('this is the new project submit, response:', response?.data)
  
      setName('')
      setCostumer('')
      setDescription('')
      setDispatchDate('')
  
  
    }

    const handleClick = () => {
      if(confirm('Are you sure, you wanna delete this Project?')) {
        deleteProject(id)
      } else {

      }
    }

    const {message} = Notify;


    



  return (
    <div>

      <div className="flex flex-row-reverse justify-between pb-5">

      <div className="flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
    </svg>



        <button
         onClick={handleClick}

        >
          Delete 
        </button>


        </div>

        <h1 className=" font-bold text-4xl text-gray-500">Edit Project: 
        <span className=" capitalize  text-gray-700"> {''}
            {project?.name}
        </span>
        </h1>

      </div>


      



        <div>
        <form
                className='bg-white py-10 px-5 md:w-1/2 rounded-lg'
                onSubmit={handleSubmit}
                >

          { message && <Alert alert={Notify}/>
                          }
            <ProjectInput name={'Project'} onInput={setName} value={name}/>
            <ProjectInput name={'description'} onInput={setDescription} value={description}/>
            <ProjectInput name={'dispatchDate'} onInput={setDispatchDate} value={dispatchDate} type={'date'}/>
            <ProjectInput name={'costumer'} onInput={setCostumer}  value={costumer}/>

        <button
            type='submit'
          className=' bg-sky-700 w-full mb-5 py-3 text-white font-bold uppercase rounded hover:cursor-pointer hover:bg-sky-800 transition-colors'
        >
          Save Changes
        </button>

        </form>
        </div>
       
      
    </div>
  )
}

export default EditProject