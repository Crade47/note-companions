import { useEffect } from 'react';
import { Navigate, Outlet, useLocation} from 'react-router-dom';

function ProtectedRoute({children}) {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user"));


  return(
    !user || user.uid==="" ? <Navigate to="/login" replace state={{ from: location }}/> : children
  ) 

  ;
}

export default ProtectedRoute;
