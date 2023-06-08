import {useState, useEffect} from 'react'
import {useParams, Link } from 'react-router-dom'
import Alert from '../components/Alert'
import axios from 'axios'
const ConfirmAccount = () => {

  const params = useParams();
  const [Notify, setNotify] = useState({})
  const [ConfirmAccount, SetConfirmAccount] = useState(false)
  const {id} = params;


  useEffect(() => {
    const confirmAccount = async () => {
      try {
        const url = `http://localhost:4000/api/users/confirm/${id}`;
        const {data} = await axios(url);

        
        setNotify({
          message: data.message,
          error: false
        })

        SetConfirmAccount(true)

      } catch (error) {
        setNotify({
          message: error.response.data.message,
          error: true
        })
      }
    }

    confirmAccount();

    
  }, [])
  
  return (
    <>
       <h1 className=' text-center text-sky-600 font-black text-6xl capitalize'>Confirm your {''}
    <span className='text-slate-700 '>Account</span> {''}
    and start with your new Projects
    </h1>

    {
      message && <Alert alert={Notify}/>
    }
    </>
  )
}

export default ConfirmAccount