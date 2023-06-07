
import { useState } from 'react'
import { Link } from 'react-router-dom'
import Alert from '../components/Alert'
import axios from 'axios'

const SignUp = () => {

  const [Name, setName] = useState('')
  const [Email, setEmail] = useState('')
  const [Password, setPassword] = useState('')
  const [SecondPassword, setSecondPassword] = useState('')

  const [Notify, setNotify] = useState({})

  const handleSubmit = async (e) => {
    e.preventDefault();

    if([Name, Email, Password, SecondPassword].includes('')) {
      setNotify({
          message: 'All the fields are Mandatory!',
          error: true,
      })
      return
    }

    if(Password !== SecondPassword) {
      setNotify({
          message: 'The Password are different!',
          error: true,
      })
      return
    }
    if(Password.length < 6) {
      setNotify({
          message: 'The Password too short!',
          error: true,
      })
      return
    }

    setNotify({});

    try {

      const response = await axios.post('http://localhost:4000/api/users/', 
      {
        name: Name, 
        email: Email, 
        password: Password
      });

      setNotify({
        message: response.data.message,
        error: false
      })

      setName('')
      setEmail('')
      setPassword('')
      setSecondPassword('')
      
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
       message && <Alert alert={Notify} />
    }
    <form className='my-10 bg-white shadow rounded-lg p-10'
    
    onSubmit={handleSubmit}>

    <div className='my-5'>
            <label 
              className='uppercase text-gray-600 block text-xl font-bold'
              htmlFor='name'
              >name
              
              </label>
            <input
              id='name'
              type='text'
              placeholder='Type your name'
              className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
              value={Name}
              onChange={(e) => {setName(e.target.value)}}
            />
        </div>


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
              value={Email}
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
              value={Password}
              onChange={(e) => {setPassword(e.target.value)}}
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
              value={SecondPassword}
              onChange={(e) => {setSecondPassword(e.target.value)}}
            />
        </div>



        <input
          type='submit'
          value='Create Account'
          className=' bg-sky-700 w-full mb-5 py-3 text-white font-bold uppercase rounded hover:cursor-pointer hover:bg-sky-800 transition-colors'
        />
       
    </form>

    <nav className=' lg:flex lg:justify-between'>
      <Link
        className='block text-center my-5 text-slate-500 uppercase text-sm'
        to={'/'}
      >
        You do have a Account with us? - if yes, sign-in here!
      </Link>
    </nav>

    </>
  )
}

export default SignUp