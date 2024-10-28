import PizzaLogo from '../assets/images/Pizza-logo.png'
import Footer from '../Components/Footer'

function Layout({children}){
    return (
        <div>
            <nav className="flex items-center justify-around h-16 text-[#6B7280] font-mono border-none shadow-md">
                <div className="flex items-center justify-center">
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
            </nav>
            {children}
            <footer>
                <Footer />
            </footer>
        </div>
    )
}

export default Layout