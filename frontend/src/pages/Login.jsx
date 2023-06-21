import React, { useState, useEffect} from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import Alert from '../components/Alert'
import axiosClient from '../config/AxiosConfig'
import useAuth from '../hooks/UseAuth'

const Login = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [Notify, setNotify] = useState('')

  const {setAuth, AuthUser} = useAuth();
  const navigate = useNavigate();



  const handleSubmit = async (e) => {
    e.preventDefault();

    if([password,  email].includes('')) {
      setNotify({
          message: 'All the fields are Mandatory!',
          error: true,
      })
      return
    }


    setNotify({});

    try {

      const response = await axiosClient.post(`/users/login`, {email, password});

      setNotify({})
      localStorage.setItem('token', response.data.token);
      setAuth(response.data);
      navigate('/projects')
  
      
    } catch (error) {

      setNotify({
        message: error.response.data.message,
        error: true
      })
    }




  }

  const {message} = Notify;
  return (
    <>
    <h1 className='text-sky-600 font-black text-6xl capitalize'>Sign-In and Start with your {''}
    <span className='text-slate-700 '>projects</span>
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
              value={email}
              onChange={(e) => {setEmail(e.target.value)}}
            />
        </div>

        <div className='my-5'>
            <label 
              className='uppercase text-gray-600 block text-xl font-bold'
              htmlFor='password'
              >Password
              
              </label>
            <input
              id='password'
              type='password'
              placeholder='Enter your Password'
              className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
              value={password}
              onChange={(e) => {setPassword(e.target.value)}}
            />
        </div>

        <input
          type='submit'
          value='Sign-In'
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

      <Link
        className='block text-center my-5 text-slate-500 uppercase text-sm'
        to={'/forgot-password'}
      >
       Have you forgotten your password? 
      </Link>
    </nav>

    </>
  )
}

export default Login