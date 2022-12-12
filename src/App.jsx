import { useEffect, useState } from 'react'
import TextField from './components/TextField'
import Card from './components/Card'
import { db } from "../firebase-config"
import { collection, getDocs, onSnapshot, query, doc, deleteDoc, orderBy } from "firebase/firestore"

function App() {
  const [users, setUsers] = useState([]);

  const usersCollectionRef = collection(db, "user");

  const q = query(usersCollectionRef, orderBy("createdAt", 'desc'));
  
  //Getting the notes
  useEffect(()=>{

      const getInfo = () =>{
        onSnapshot(q,(snapshot)=>{
          setUsers(snapshot.docs.map((doc) => ({...doc.data(), id: doc.id})))
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
      <TextField />
      <div className="flex flex-wrap">
        {users.map((item) => {
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
