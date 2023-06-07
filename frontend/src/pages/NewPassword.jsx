import React from 'react'
const NewPassword = () => {
  return (
    <>
    <h1 className='text-sky-600 font-black text-6xl capitalize'> For my your Account, you should {''}
    <span className='text-slate-700 '>what it takes</span>
    </h1>
    <h2 className='text-3xl font-black text-gray-600 font-extralight'>Change your password now!</h2>

    <form className='my-10 bg-white shadow rounded-lg p-10'>

        
        <div className='my-5'>
            <label 
              className='uppercase text-gray-600 block text-xl font-bold'
              htmlFor='password'
              >
                New Password
              
              </label>
            <input
              id='password'
              type='password'
              placeholder='Enter your New Password'
              className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
            />
        </div>

        
        <div className='my-5'>
            <label 
              className='uppercase text-gray-600 block text-xl font-bold'
              htmlFor='password2'
              > Repeat Password
              
              </label>
            <input
              id='password2'
              type='password'
              placeholder='Repeat your Password'
              className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
            />
        </div>



        <input
          type='submit'
          value='Restart Account'
          className=' bg-sky-700 w-full mb-5 py-3 text-white font-bold uppercase rounded hover:cursor-pointer hover:bg-sky-800 transition-colors'
        />
       
    </form>


    </>
  )
}

export default NewPassword