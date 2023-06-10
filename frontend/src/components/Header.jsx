import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className='px-4 py-5 bg-white border-b '>
      <div className='md:flex md:justify-between'>
        <h2 className=' text-4xl text-sky-600 font-black text-center'>
          Uptask 
        </h2>

        <input
          type='search'
          placeholder='Search Project'
          className='rounded-lg w-96 block p-2 border'
        />

        <div className='flex justify-center items-center gap-3'>
            <Link
              to={'/projects'}
              className='text-white bg-sky-600 p-3 rounded-md uppercase font-bold hover:bg-red-500 transition-colors'
              >Projects
              </Link>
              <button
                type='button'
               
                className='font-semibold uppercase bg-slate-300 p-3 rounded-md hover:bg-slate-400 transition-all'
              >
                Log Out
              </button>
        </div>
      </div>

    </header>
  )
}

export default Header