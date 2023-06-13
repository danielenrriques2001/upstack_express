import { Dialog } from '@headlessui/react'
import { useEffect, useState } from 'react'
import UseProject from '../hooks/UseProject';
import Alert from '../components/Alert'
import { useParams } from 'react-router-dom';

const PRIORITY = ['low', 'medium', 'high'];

const FormTask = () => {
    

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [priority, setPriority] = useState('')
    const [dispatch, setDispatch] = useState('')
    const [id, setId] = useState('')
    
    const params = useParams();

    const {handleNotify, Notify, createTask, task, editTask} = UseProject();

    useEffect(() => {



            setName(task.name)
            setDescription(task.description)
            setDispatch(task.dispatch_Date?.split('T')[0])
            setPriority(task.priority)
            setId(task._id)



     
    }, [])
    



    const handleSubmit = e => {

        e.preventDefault();

        if([name, description, priority].includes('')) {
            handleNotify({
                message: 'All the fields are mandatory',
                error: true,
            })

            return
        }


        createTask({id, name, priority, description,  dispatch_Date: dispatch, project: params.id});






    }

    const {message} = Notify;


  return (
     <div className="sm:flex sm:items-start">
                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                                    <Dialog.Title as="h3" className="text-lg leading-6 font-bold text-gray-900">
                                    { !id ? ' Create Task' : 'Edit Task'}
                                    </Dialog.Title>

                                    <form
                                        className='my-10'
                                        onSubmit={handleSubmit}
                                    >

                                        {
                                            message && <Alert alert={Notify}/>
                                        }

                                        <div
                                            className='mb-5'
                                        >
                                            <label
                                            className='text-gray-700 uppercase font-bold text-sm'
                                            htmlFor='name'
                                            >
                                                Name
                                            </label>
                                            <input
                                                type='text'
                                                id='name'
                                                placeholder={`task's name`}
                                                className='border-2 w-full p-2 mt-2 placeholder:gray-400 rounded-md'
                                                value={name}
                                                onChange={e => {setName(e.target.value)} }

                                            >
                                            
                                            </input>

                                        </div>


                                        <div
                                            className='mb-5'
                                        >
                                            <label
                                            className='text-gray-700 uppercase font-bold text-sm'
                                            htmlFor='description'
                                            >
                                                Description
                                            </label>
                                            <input
                                                type='text'
                                                id='description'
                                                placeholder={`task's description`}
                                                className='border-2 w-full p-2 mt-2  h-20 placeholder:gray-400 rounded-md'
                                                value={description}
                                                onChange={e => {setDescription(e.target.value)} }

                                            >
                                            
                                            </input>

                                        </div>


                                        <div
                                            className='mb-5'
                                        >
                                            <label
                                            className='text-gray-700 uppercase font-bold text-sm'
                                            htmlFor='priority'
                                            >
                                                Priority
                                            </label>
                                            <select
                        
                                                id='priority'
                                                className='border-2 w-full p-2 mt-2 placeholder:gray-400 rounded-md '
                                                value={priority}
                                                onChange={e => {setPriority(e.target.value)} }

                                            >

                                                <option value=''>---Select---</option>

                                                {
                                                    PRIORITY.map(category => (
                                                        <option key={category} className='capitalize cursor-pointer' value={category}>{category}</option>
                                                    ))
                                                }



                                            
                                            </select>

                                        </div>

                                        <div
                                            className='mb-5'
                                        >
                                            <label
                                            className='text-gray-700 uppercase font-bold text-sm'
                                            htmlFor='dispatch'
                                            >
                                                Dispatch Date
                                            </label>
                                            <input
                                                type='date'
                                                id='dispatch'
                            
                                                className='border-2 w-full  mt-2 p-5 placeholder:gray-400 rounded-md'
                                                value={dispatch}
                                                onChange={e => {setDispatch(e.target.value)} }

                                            >
                                            
                                            </input>

                                        </div>


                                        <input
                                            type='submit'
                                            className='bg-sky-600 hover:bg-sky-600 text-white uppercase cursor-pointer font-bold transition-colors rounded text-sm w-full p-5'
                                            value={ !id ? ' Create Task' : 'Edit Task'}
                                        />

                                           
                                        
                                        


                                    </form>

                                </div>
                            </div>
  )
}

export default FormTask