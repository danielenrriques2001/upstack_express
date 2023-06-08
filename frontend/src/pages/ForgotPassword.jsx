import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Alert from '../components/Alert'
const ForgotPassword = () => {

  const [email, SetEmail] = useState('');
  const [Notify, setNotify] = useState({});

  const handleSubmit = async e => {
    e.preventDefault();


    if(email.length < 6 || email === '' ) {
      setNotify({
          message: 'The Email its not valid!',
          error: true,
      });
      
     return
    }

   


      try {

       
      const {data} = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/forgot-password`,{email});

  
      setNotify({
        message: data.message,
        error: false,
    })
        
      } catch (error) {
        setNotify({
          message: error.response.data.message,
          error: true,
      })
      }

  







  }

  const {message} = Notify;


  return (
    <>

    
          <h1 className=' text-center text-sky-600 font-black text-6xl capitalize'>Recover your {''}
    <span className='text-slate-700 '>Access</span>
    </h1>

    {
      message && <Alert alert={Notify}/>
    }

    <form 
      className='my-10 bg-white shadow rounded-lg p-10'
      onSubmit={handleSubmit}
      >
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
              onChange={(e) => {SetEmail(e.target.value)}}
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