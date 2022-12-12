import { useState } from "react";
import { db } from "../../firebase-config";
import { addDoc, collection, getDocs, onSnapshot, orderBy, query, serverTimestamp } from "firebase/firestore"
function TextField() {

  const usersCollectionRef = collection(db, "user");
  const q = (usersCollectionRef, orderBy("createdAt"))
  const [textData, setTextData] = useState({
    title: "",
    content: "",
    createdAt: serverTimestamp()
  });

  const handleFormInput = (event) => {
    setTextData((prevState) => {
      return {
        ...prevState,
        [event.target.id]: event.target.value,
      };
    });
  };

  const handleSubmit = (event)=>{
    event.preventDefault()
    addDoc(usersCollectionRef,textData)
    event.target.reset();
    setTextData((prevState) =>({...prevState, title:"", content:""}));
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="mt-20 flex flex-col max-w-xs items-center justify-items-center mx-auto border-transparent border border-slate-400 p-5 rounded-md"
        id="formLOL"
      >
        <button 
          type="submit" 
          className="text-white rounded-[100%] p-2 outline"
        >
          submit
        </button>
        <input
          type="text"
          id="title"
          name="title"
          placeholder="Title"
          className="text-white text-center bg-transparent border-transparent focus:outline-none p-2"
          onChange={handleFormInput}
        />
        <div className="w-full h-px bg-slate-400 bg-opacity-40"></div>
        <textarea
          type="text-area"
          id="content"
          name="content"
          placeholder="Start Typing Content"
          className="text-white text-center bg-transparent focus:outline-none p-2 resize-none"
          onChange={handleFormInput}
        />
      </form>
    </div>
  );
}

export default TextField;
