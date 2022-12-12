import { useEffect, useState } from 'react'
import TextField from './components/TextField'
import Card from './components/Card'
import { db, auth, provider } from "../firebase-config"
import { collection, getDocs, onSnapshot, query, doc, deleteDoc, orderBy } from "firebase/firestore"
import { signInWithPopup } from 'firebase/auth'

function App() {
  const [usersContent, setUsersContent] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(auth.currentUser);
  const [userInfo, setUserInfo] = useState({
    name: '',
    photoURL: ''
  })

  const usersCollectionRef = collection(db, "user");

  const queryOrder = query(usersCollectionRef, orderBy("createdAt", 'desc'));

  //GOOGLE SIGN IN
  const signInWithGoogle = () =>{
    signInWithPopup(auth, provider).then((result)=>{
      
      setUserInfo({
        name: result.user.displayName, 
        photoURL: result.user.photoURL
      });
      
    }).then(
      setIsLoggedIn((prevState) => !prevState)
    )

  }

  //SIGN OUT
  const signOutWithGoogle = () =>{
    auth.signOut()
      .then(setIsLoggedIn((prevState) => !prevState))
      .catch((error) => console.log(`Error: ${error}`));
  }
  
  //Getting the notes
  useEffect(()=>{

      const getInfo = () =>{
        onSnapshot(queryOrder,(snapshot)=>{
          setUsersContent(snapshot.docs.map((doc) => ({...doc.data(), id: doc.id})))
        })

      }
      
      getInfo();
 
 
  },[])

  
  
  const deleteNote = (id) =>{
    const docReference = doc(db, "user", id);
    deleteDoc(docReference)
  }

  return (
    <div className="dark bg-black h-screen">

      <div className="text-4xl sm:text-center text-left font-inconsolata dark:text-white text-black">My Notes</div>
      <button className='text-xl text-white bg-violet-400 p-3' onClick={signInWithGoogle}>
        Sign in
      </button>
      {/* {isLoggedIn ? <div className='text-white text-5xl'>Current User: {userInfo.name}</div>:<div className='text-white text-5xl'>'No user'</div>} */}
      <button className='text-xl text-white bg-violet-600 p-3' onClick={signOutWithGoogle}>
        Sign Out
      </button>
      <TextField />
      <div className="flex flex-wrap">
        {usersContent.map((item) => {
        return(
          <Card
            key={item.id}
            id={item.id} 
            title={item.title} 
            content={item.content}
            deleteNote={deleteNote}
          />)
        })}
      </div>
      
    
    </div>
  )
  }


export default App
