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
    // <div className="dark bg-black h-screen grid--parent">

    //   <button className='text-xl text-white bg-violet-400 p-3' onClick={signInWithGoogle}>
    //     Sign in
    //   </button> 
    //   {isLoggedIn ? <div className='text-white text-5xl'>Current User: {userInfo.name}</div>:<div className='text-white text-5xl'>'No user'</div>}
    //   <button className='text-xl text-white bg-violet-600 p-3' onClick={signOutWithGoogle}>
    //     Sign Out
    //   </button>
    //   <TextField />
    //   <Header 
    //     className="" 
    //     classProps="header-parent"
    //     isLoggedIn={isLoggedIn}
    //     userInfo={userInfo}
    //     signInWithGoogle={signInWithGoogle}
    //   />
    //   <div className="">
    //     {usersContent.map((item) => {
    //     return(
    //       <Card
    //         key={item.id}
    //         id={item.id} 
    //         title={item.title} 
    //         content={item.content}
    //         deleteNote={deleteNote}
    //       />)
    //     })}
    //   </div>
      
    
    // </div>
      <>
        
        <RouterProvider router={router}/>
        

      </>
  )
  }


export default App
