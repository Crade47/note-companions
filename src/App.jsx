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
      element: <ProtectedRoute />,
      children:[
        {
          path: "content",
          element: <ContentPage/>
        }
      ]
    },
    {
      path: "/login",
      element: <LoginPage/>
    },
    {
      path: "/content",
      element: <ProtectedRoute/>,
      children:[
        {
          path: "content",
          element: <ContentPage/>
        }
      ]
    }
  ])

  return (
  
      <>
        <RouterProvider router={router}/>
      </>
  )
  }


export default App
