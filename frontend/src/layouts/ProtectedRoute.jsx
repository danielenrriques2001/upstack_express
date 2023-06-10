import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import UseAuth from '../hooks/UseAuth'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
const ProtectedRoute = () => {

  const {auth, loading} = UseAuth();

  if(loading) return 'Loading....'

 
  return (
    <div>
      {auth._id ? (
          <div className=' bg-gray-100'>
            <Header/>
              <div className='md:flex  md:min-h-screen'>
                <Sidebar/>

                <main className='flex-1 p-10'>
                  <Outlet/>
                </main>
              </div>
            
          </div>
      )  : <Navigate to={'/'}/>}
    </div>
  )
}

export default ProtectedRoute