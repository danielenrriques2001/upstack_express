import React from 'react'

const ProjectInput = ({name, onInput, type, value}) => {
  return (
    <div className='my-5 shadow-md p-5 rounded-lg'>
            <label 
              className='uppercase text-gray-600 block text-sm font-bold'
              htmlFor={name}
              >
                {name}
              
              </label>
            <input
              id={name}
              type={type ?? 'text'}
              placeholder='Type your name'
              className='w-full mt-3 p-3 border  bg-gray-50 placeholder-gray-400 rounded-md'
              value={value}
              onChange={(e) => {onInput(e.target.value)}}
            />
        </div>

  )
}

export default ProjectInput