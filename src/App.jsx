import { useEffect, useState } from 'react'
import { db, auth, provider } from "../firebase-config"
import { collection, getDocs, onSnapshot, query, doc, deleteDoc, orderBy } from "firebase/firestore"
import LoginPage from './pages/LoginPage'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ContentPage from './pages/ContentPage'
import ProtectedRoute from './utils/ProtectedRoute'


function App() {
  const [usersContent, setUsersContent] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(auth.currentUser);
  const [userInfo, setUserInfo] = useState({
    name: '',
    photoURL: ''
  })

  const usersCollectionRef = collection(db, "user");

  const queryOrder = query(usersCollectionRef, orderBy("createdAt", 'desc'));
  
  const deleteNote = (id) =>{
    const docReference = doc(db, "user", id);
    deleteDoc(docReference)
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <ProtectedRoute component={ContentPage}/>
    },
    {
      path: "/login",
      element: <LoginPage/>
    },
    {
      path: "/content",
      element: <ProtectedRoute component={ContentPage}/>
    }
  ])

  return (
  
      <>
        <RouterProvider router={router}/>
      </>
  )
  }


export default App
