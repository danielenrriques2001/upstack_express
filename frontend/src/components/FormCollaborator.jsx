import UseProject from '../hooks/UseProject'
import Alert from '../components/Alert'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
const FormCollaborator = () => {

    const [email, setEmail] = useState('');
    const {Notify, handleNotify, handleSubmitCollaborator} = UseProject();




    

    const handleSubmit = e => {
        e.preventDefault();

        if(email === '') {
            handleNotify({
                message: 'The Field must be filled!',
                error: true,
            })

            return;
        }

        handleSubmitCollaborator(email)


    

        
    }

    const {message} = Notify;
  return (
    <form
        className='bg-white py-10 px-5 md:w-1/2 rounded-lg shadow'
        onSubmit={handleSubmit}
        >

            {
                message && <Alert alert={Notify}/>
            }

                                <div className='mb-5'>

                                <label
                                            className='text-gray-700 uppercase font-bold text-sm'
                                            htmlFor='query'
                                            >
                                                Search
                                            </label>
                                            <input
                                                type='email'
                                                id='query'

                                                className='border-2 w-full p-2 mt-2 placeholder:gray-400 rounded-md'
                                                value={email}
                                                onChange={e => {setEmail(e.target.value)} }

                                            >
                                            
                                            </input>


                                </div>

                                <input
                                            type='submit'
                                            className='bg-sky-500 hover:bg-sky-600 text-white uppercase cursor-pointer font-bold transition-colors rounded-lg text-sm w-full p-2'
                                            value={'Find Collaborator'}
                                        />
    </form>
  )
}

export default FormCollaborator