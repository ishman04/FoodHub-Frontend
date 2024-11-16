import { Route, Routes } from 'react-router'
import './App.css'
import Layout from './Layouts/Layout'
import Home from './Pages/Home'
import Signup from './Pages/Auth/Signup'
import Login from './Pages/Auth/Login'
import NotFound from './Pages/NotFound'
import Denied from './Pages/Auth/Denied'
import AddProduct from './Pages/Admin/AddProduct'
import ProductDetails from './Pages/Products/ProductDetails'
import CartDetails from './Pages/Cart/CartDetails'
import OrderSuccess from './Pages/Order/OrderSuccess'
import Order from './Pages/Order/Order'
import RequireAuth from './Components/Auth/RequireAuth'

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

        <Route element={<RequireAuth/>}>
          {/* ProductId will be passes automatically to ProductDetails component using useParams */}
        <Route path='/product/:productId' element={<ProductDetails />} /> 
        <Route path='/cart' element={<CartDetails />} />
        <Route path='/order' element={<Order />} />
          <Route path='/order/success' element={<OrderSuccess />} />
        </Route>
        
      </Routes>
    </>
  )
}

export default App
