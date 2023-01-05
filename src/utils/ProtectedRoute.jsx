import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function ProtectedRoute({ component: Component}) {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  useEffect(() => {

    const checkIfLoggedIn = () =>{
        if(user.uid === ""){
            return false
        }
        return true;

    }

    if (!checkIfLoggedIn()) {
      navigate("/login");
    }
  }, [location]);

  return <Component/>;
}

export default ProtectedRoute;
