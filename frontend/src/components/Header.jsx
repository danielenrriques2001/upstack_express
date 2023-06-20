import React from 'react'
import { Link } from 'react-router-dom'
import UseProject from '../hooks/UseProject'
import Search from './Search'
import UseAuth from '../hooks/UseAuth'

const Header = () => {

  const {handleSearcher, CloseSectionProject, } = UseProject();
  const {CloseSectionAuth} = UseAuth();


  const handleCloseSection = () => {

    CloseSectionProject();
    CloseSectionAuth();
    localStorage.removeItem('token')


  }

  return (
    <header className='px-4 py-5 bg-white border-b '>
      <div className='md:flex md:justify-between'>
        <h2 className=' text-4xl text-sky-600 font-black text-center'>
          Uptask 
        </h2>

       

        <div className='flex justify-center items-center gap-3'>

        <button
          type='button'
          onClick={() => {handleSearcher()}}
          className='font-bold uppercase transition-all'
        >Search Project
        </button>

            <Link
              to={'/projects'}
              className='text-white bg-sky-600 p-3 rounded-md uppercase font-bold hover:bg-red-500 transition-colors'
              >Projects
              </Link>
              <button
                type='button'
                onClick={() => {handleCloseSection()}}
               
                className='font-semibold uppercase bg-slate-300 p-3 rounded-md hover:bg-slate-400 transition-all'
              >
                Log Out
              </button>

              <Search/>
        </div>
      </div>

    </header>
  )
}

export default Header