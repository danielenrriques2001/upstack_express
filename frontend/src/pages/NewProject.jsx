import React, { Fragment, useState } from 'react'
import ProjectInput from '../components/ProjectInput'
const NewProject = () => {


  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [dispatchDate, setDispatchDate] = useState('')
  const [costumer, setCostumer] = useState('')
  return (
    <Fragment>
       <h1 className='text-4xl text-gray-800 font-black '>Create Project</h1>

        <div className='mt-10 flex justify-center'>

          <form 
          
            className='bg-white py-10 px-5 md:w-1/2 rounded-lg'
            
            >

            <ProjectInput name={'Project'} onInput={setName} value={name}/>
            <ProjectInput name={'description'} onInput={setDescription} value={description}/>
            <ProjectInput name={'dispatchDate'} onInput={setDispatchDate} value={dispatchDate} type={'date'}/>
            <ProjectInput name={'costumer'} onInput={setCostumer}  value={costumer}/>

            <button
          type='submit'
          value='Sign-In'
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