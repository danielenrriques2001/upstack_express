import {useState, useEffect} from 'react'
import { Link, useParams, redirect } from 'react-router-dom'
import Alert from '../components/Alert';
import axiosClient  from '../config/AxiosConfig'

const NewPassword = () => {

  const params = useParams();

  const [ValidToken, setValidToken] = useState(false);
  const [password, setPassword] = useState('');
  const [validPassword, setValidPassword] = useState(false);
  const [Notify, SetNotify] = useState('')

  useEffect(() => {

    const checkToken = async () => {
      try {
        //TODO:
          const {data} = await axiosClient(`/users/forgot-password/${params?.token}`)
          setValidToken(true)

      } catch (error) {
        SetNotify({
          message: error.response.data.message,
          error: true,
      })
      }
    }

    checkToken();

  }, [])


  const handleSubmit = async (e) => {
    e.preventDefault();

    if(password === '') {
      setNotify({
          message: 'The Field is Mandatory!',
          error: true,
      })
      return
    }


    if(password.length < 6) {

      SetNotify({
          message: 'The Password too short!',
          error: true,
      })
      return
    }

    SetNotify({});

    try {

      const response = await axiosClient.post(`/users/forgot-password/${params?.token}`, 
      {
          password
      });

     

      SetNotify({
        message: response.data.message, 
        error: false
      })
      

      setPassword('')
      setValidPassword(true)
      
    } catch (error) {

      SetNotify({
        message: error.response.data.message,
        error: true
      })
    }




  }

  const {message} = Notify;  
  return (
    <>
    <h1 className='text-sky-600 font-black text-6xl capitalize'> For my your Account, you should do {''}
    <span className='text-slate-700 '>what it takes</span>
    </h1>
    <h2 className='text-3xl font-black text-gray-600 font-extralight'>
      Change your Password now!
    </h2>
    {
      message && <Alert alert={Notify}/>
    }

   {
    ValidToken &&  <form onSubmit={handleSubmit} className='my-10 bg-white shadow rounded-lg p-10'>

        
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
          value={password}
          onChange={(e) => {setPassword(e.target.value)}}
        />
    </div>



    <input
      type='submit'
      value='Restart Account'
      className=' bg-sky-700 w-full mb-5 py-3 text-white font-bold uppercase rounded hover:cursor-pointer hover:bg-sky-800 transition-colors'
    />
   
</form>
   }

   {
    validPassword && <Link
    className='block text-center my-5 text-slate-500 uppercase text-sm'
    to={'/'}
  >
    Sign In - and start with your projects
  </Link>
   }


    </>
  )
}

export default NewPassword