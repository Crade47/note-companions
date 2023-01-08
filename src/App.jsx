import LoginPage from './pages/LoginPage'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ContentPage from './pages/ContentPage'
import ProtectedRoute from './utils/ProtectedRoute'


function App() {


  const router = createBrowserRouter([
    {
      path: "/",
      element: <ProtectedRoute> <ContentPage/> </ProtectedRoute>,
      
    },
    {
      path: "/login",
      element: <LoginPage/>
    }
  ])

  return (
  
      <>
        <RouterProvider router={router}/>
      </>
  )
  }


export default App
