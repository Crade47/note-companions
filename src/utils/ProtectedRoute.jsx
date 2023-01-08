import { useEffect } from 'react';
import { Navigate, Route, useLocation, useNavigate, Routes, Outlet } from 'react-router-dom';

function ProtectedRoute() {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user"));



  return(
    user ? <Outlet/> : <Navigate to="/login" replace state={{ from: location }}/>
  ) 

  ;
}

export default ProtectedRoute;
