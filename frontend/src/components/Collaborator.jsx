import React from 'react'
import UseProject from '../hooks/UseProject';

const Collaborator = ({collaborator}) => {
    const {name, email} = collaborator;

    console.log('this is the collab', collaborator)
    
    const {handleDeleteCollaborator} = UseProject();

  return (
    <div className=' bg-white border  shadow-sm p-5 rounded-xl mt-2 flex justify-between'>

        <div className=' flex items-center gap-2'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.7" stroke="currentcolor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>

                <div>
                    <h1 className='text-xl capitalize font-bold text-gray-700'>{name}</h1>
                    <p className='text-sm font-extralight'>{email}</p>
                </div>

        </div>
        <div>

        <button
                className="text-sm px-10 py-3 w-full md:w-auto rounded-lg uppercase font-bold bg-red-700 text-white text-center mt-5 flex gap-2 justify-center items-center "
                onClick={() => {handleDeleteCollaborator(collaborator)}}
                >
                        Delete

                </button>

        </div>

       

     
    </div>
  )
}

export default Collaborator