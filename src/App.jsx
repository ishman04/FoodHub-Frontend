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
import Menu from './Pages/Menu/Menu'
import AboutUs from './Pages/About us/AboutUs'
import LocationSearch from './Pages/Location/Location'
import SelectSavedAddress from './Pages/Location/SelectSavedAddress'
import Orders from './Pages/Order/Orders'
import LocationGuard from './Components/Location/LocationGuard'

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
          <Route element={<LocationGuard />}>
            <Route path='/product/:productId' element={<ProductDetails />} /> 
            <Route path='/cart' element={<CartDetails />} />
            <Route path='/order' element={<Order />} />
            <Route path='/order/success' element={<OrderSuccess />} />
            <Route path="/orders" element={<Orders />} />
          </Route> 
        </Route>
        <Route path='/select-address' element = {<LocationSearch/>}/>
        <Route path='/user-addresses' element ={<SelectSavedAddress/>} />
        <Route path='/menu' element={<Menu/>}/>
        <Route path='/about-us' element={<AboutUs/>}/>
      </Routes>
    </>
  )
}

export default App
