import { useState } from "react"
import ProjectInput from "./ProjectInput"


const ProjectForm = ({project, handleNotify}) => {


  const [name, setName] = useState(project.name)
  const [description, setDescription] = useState(project.description)
  const [dispatchDate, setDispatchDate] = useState(project.dispatch_Date.split('T')[0])
  const [costumer, setCostumer] = useState(project.costumer)


  const handleSubmit = async (e) => {
    e.preventDefault();

    if([Name, Email, Password, SecondPassword].includes('')) {
      handleNotify({
          message: 'All the fields are Mandatory!',
          error: true,
      })
      return
    }

  
    handleNotify({});

    try {

      const response = await axiosClient.post(`/users`, 
      {
        name: Name, 
        email: Email, 
        password: Password
      });

      handleNotify({
        message: response.data.message,
        error: false
      })

      setName('')
      setEmail('')
      setPassword('')
      setSecondPassword('')
      
    } catch (error) {

      handleNotify({
        message: error.response.data.message,
        error: true
      })
    }




  }
  

  return (
    <form
      className='bg-white py-10 px-5 md:w-1/2 rounded-lg'
      onSubmit={handleSubmit}
    >

            <ProjectInput name={'Project'} onInput={setName} value={name}/>
            <ProjectInput name={'description'} onInput={setDescription} value={description}/>
            <ProjectInput name={'dispatchDate'} onInput={setDispatchDate} value={dispatchDate} type={'date'}/>
            <ProjectInput name={'costumer'} onInput={setCostumer}  value={costumer}/>

    </form>
  )
}

export default ProjectForm