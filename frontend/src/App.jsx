import { useState } from 'react'
import '../src/index.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import AuthLayout from '../src/layouts/AuthLayout'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import ForgotPassword from '../src/pages/ForgotPassword'
import NewPassword from '../src/pages/NewPassword'
import ConfirmAccount from './pages/ConfirmAccount'
function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
    <Routes>
        <Route path='/' element={<AuthLayout/>}>
          <Route index element={<Login/>}/>
          <Route path='sign-up' element={<SignUp/>}/>
          <Route path='forgot-password' element={<ForgotPassword/>}/>
          <Route path='forgot-password/:token' element={<NewPassword/>}/>
          <Route path='confirm-account/:id' element={<ConfirmAccount/>}/>
        </Route>
    </Routes>
   
    </BrowserRouter>
  )
}

export default App
