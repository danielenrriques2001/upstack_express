import React, { Fragment, useState } from 'react'
import ProjectInput from '../components/ProjectInput'
import UseProject from '../hooks/UseProject'
import Alert from '../components/Alert'
const NewProject = () => {


  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [dispatchDate, setDispatchDate] = useState('')
  const [costumer, setCostumer] = useState('')


  const {setProjects, projects, submitProject, Notify, handleNotify} = UseProject();


  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if([name, description, dispatchDate, costumer].includes('')) {
      handleNotify({
          message: 'All the fields are Mandatory!',
          error: true,
      })


    
      return
    }

    await submitProject({name, description, dispatch_Date: dispatchDate, costumer});

    setName('')
    setCostumer('')
    setDescription('')
    setDispatchDate('')


  }

  const {message} = Notify;
  return (
    <Fragment>


       <h1 className='text-4xl text-gray-800 font-black text-center '>Create Project</h1>
       <div className=''>
       
       </div>
      

        <div className='mt-10 flex justify-center'>

        

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
          Create Project
        </button>
          </form>
       </div>

    </Fragment>
  )
}

export default NewProject