import { useParams } from "react-router-dom"
import UseProject from "../hooks/UseProject"
import { useEffect, useState } from "react";
import ProjectForm from '../components/ProjectForm'
import ProjectInput from "../components/ProjectInput";
import Alert from "../components/Alert";

const EditProject = () => {

    const params = useParams()
    const {project, getProject, loading, submitProject, handleNotify, Notify} = UseProject();

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

    const {message} = Notify;
    



  return (
    <div>
        <h1 className=" font-bold text-4xl text-gray-500">Edit Project: 
        <span className=" capitalize  text-gray-700"> {''}
            {project?.name}
        </span>
        </h1>



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