import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router"

function RequireAuth(){
    const {isLoggedIn} = useSelector((state)=> state.auth)
    return isLoggedIn ? <Outlet/> : <Navigate to={'/auth/login'}/>
}

export default RequireAuth