import { useEffect, useState } from 'react'
import TextField from './components/TextField'
import Card from './components/Card'
import { db } from "../firebase-config"
import { collection, getDocs, onSnapshot, query, doc, deleteDoc } from "firebase/firestore"

function App() {
  const [users, setUsers] = useState([]);

  const usersCollectionRef = collection(db, "user");

  
  //Getting the notes
  useEffect(()=>{

      const getInfo = async () =>{
        const data = await getDocs(usersCollectionRef);
        setUsers(data.docs.map((doc) =>({ ...doc.data(), id:doc.id })));
      }
      // const q = query(collection(db, "user"));
      // const unsub = onSnapshot(q,(querySnapshot)=>{
      //   let todo = [];
      //   querySnapshot.forEach((doc)=>{
      //     todo.push({...doc.data(), id: doc.id});
      //   })
      //   setUsers(todo);
      // })
      // return () => unsub();
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
