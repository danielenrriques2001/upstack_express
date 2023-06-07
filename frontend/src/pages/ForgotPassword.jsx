import React from 'react'
import { Link } from 'react-router-dom'

const ForgotPassword = () => {
  return (
    <>
          <h1 className=' text-center text-sky-600 font-black text-6xl capitalize'>Recover your {''}
    <span className='text-slate-700 '>Access</span>
    </h1>

    <form className='my-10 bg-white shadow rounded-lg p-10'>
        <div className='my-5'>
            <label 
              className='uppercase text-gray-600 block text-xl font-bold'
              htmlFor='email'
              >Email
              
              </label>
            <input
              id='email'
              type='email'
              placeholder='Enter your Email'
              className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
            />
        </div>

       

        <input
          type='submit'
          value='Send Email'
          className=' bg-sky-700 w-full mb-5 py-3 text-white font-bold uppercase rounded hover:cursor-pointer hover:bg-sky-800 transition-colors'
        />
       
    </form>

    <nav className=' lg:flex lg:justify-between'>
        <Link
        className='block text-center my-5 text-slate-500 uppercase text-sm'
        to={'/sign-up'}
      >
        You do have a Account with us? - if not, sign-up here!
      </Link>
    </nav>
    </>
  )
}

export default ForgotPassword