import { useState } from 'react'
import '../src/index.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import AuthLayout from '../src/layouts/AuthLayout'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import ForgotPassword from '../src/pages/ForgotPassword'
import NewPassword from '../src/pages/NewPassword'
import ConfirmAccount from './pages/ConfirmAccount'
import  { AuthProvider } from './context/AuthProvider'
import ProtectedRoute from '../src/layouts/ProtectedRoute'
import Projects from './pages/Projects'
import NewProject from './pages/NewProject'
import {ProjectProvider} from '../src/context/ProjectProvider' 
function App() {
  const [count, setCount] = useState(0)

  return (
  
    <BrowserRouter>
      <AuthProvider>
        <ProjectProvider>
    <Routes>
    {
      /**There are the public routes - no need of authentication*/
    }
      
        <Route path='/' element={<AuthLayout/>}>
          <Route index element={<Login/>}/>
          <Route path='sign-up' element={<SignUp/>}/>
          <Route path='forgot-password' element={<ForgotPassword/>}/>
          <Route path='forgot-password/:token' element={<NewPassword/>}/>
          <Route path='confirm/:id' element={<ConfirmAccount/>}/>
        </Route>

        {
      /**There are the private routes */
       }

       <Route path='/projects' element={<ProtectedRoute/>}>
          <Route index element={<Projects/>}/>
          <Route path='create-project' element={<NewProject/>}/>
       </Route>



    </Routes>
    </ProjectProvider>
    </AuthProvider>
    </BrowserRouter>
  )
}

export default App
