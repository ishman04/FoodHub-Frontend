import { Navigate, Outlet } from 'react-router-dom';

const PaymentGuard = () => {
  const isPaid = localStorage.getItem("paymentSuccess");

  return isPaid === "true" ? <Outlet /> : <Navigate to="/menu" replace />;
};

export default PaymentGuard;
