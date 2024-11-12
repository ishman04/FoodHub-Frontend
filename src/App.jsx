import { Route, Routes } from 'react-router'
import './App.css'
import Layout from './Layouts/Layout'
import Home from './Pages/Home'
import Signup from './Pages/Auth/Signup'
import Login from './Pages/Auth/Login'
import NotFound from './Pages/NotFound'
import Denied from './Pages/Auth/Denied'
import AddProduct from './Pages/Admin/AddProduct'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/auth/signup' element={<Signup />} />
        <Route path='/denied' element={<Denied/>} />
        <Route path='/auth/login' element={<Login />} />

        <Route path='/admin/addProduct' element= {<AddProduct />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
