import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const LocationGuard = ({ children }) => {
  const isDeliverable = useSelector((state) => state.location.isDeliverable);

  return isDeliverable ? <Outlet/> : <Navigate to={'/user-addresses'}/>
};

export default LocationGuard;