import { useDispatch, useSelector } from 'react-redux'
import PizzaLogo from '../assets/images/Pizza-logo.png'
import Footer from '../Components/Footer'
import { Link,useNavigate } from 'react-router-dom'
import { logout } from '../Redux/Slices/AuthSlice'
import cart from '../Components/SVGs/undraw_empty_cart_co35.svg'

function Layout({children}){
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    async function handleLogout(e) {
        e.preventDefault();
        dispatch(logout());
    }
    const {cartsData} = useSelector((state)=>state.cart)

    return (
        <div>
            <nav className="flex items-center justify-around h-16 text-[#6B7280] font-mono border-none shadow-md">
                <div onClick={() =>navigate('/')}  className="flex items-center justify-center">
                    <img className='w-20 h-20' src={PizzaLogo} alt="Pizza logo" />
                    <p>Pizza app</p>

                </div>
                <div className='hidden md:block'>
                    <ul className='flex gap-4'>
                        <li className='hover:text-[#FF9110]'>
                            {' '}
                            <p>Menu{' '}</p>
                        </li>
                    
                    
                        <li className='hover:text-[#FF9110]'>
                            {' '}
                            <p>Service{' '}</p>
                        </li>
                        <li className='hover:text-[#FF9110]'>
                            {' '}
                            <p>About{' '}</p>
                        </li>
                    </ul>
                </div>
                <div>
                    <ul className='flex flex-row justify-center items-center gap-4'>
                        <li>
                            {isLoggedIn ? (
                                <Link onClick={handleLogout}>Logout</Link>
                            ) : (
                                <Link to={'/auth/login'}>Login</Link>
                            ) }
                        </li>
                        <li className='hover:text-[#FF9110]'>
                            {isLoggedIn &&
                                (<Link to={'/cart'}>
                                    <div className='flex items-center '>
                                        <img src={cart} className='w-8 h-8' />
                                        {' '}
                                       <p className='text-black'> {cartsData?.items?.length || 0} </p> 
                                    </div>
                                </Link>
                        )}
                        </li>
                    </ul>
                </div>
            </nav>
            {children}
            <footer>
                <Footer />
            </footer>
        </div>
    )
}

export default Layout