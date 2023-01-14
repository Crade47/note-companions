import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase-config"
import { useEffect, useState } from "react";
import { collection, deleteDoc, doc, onSnapshot, orderBy, query } from "firebase/firestore";
import { motion } from "framer-motion";
import NoteCard from "../components/NoteCard";
import { createPortal } from "react-dom";
import FormPopup from "../components/FormPopup";
import Pagination from "../components/Pagination";
function ContentPage(){
   
    const user = JSON.parse(localStorage.getItem("user"));
    const navigate = useNavigate();
    const usersCollectionRef = collection(db, `users/${user.uid}/notes`);
    const queryOrder = query(usersCollectionRef, orderBy("createdAt", 'desc'));
    
    const [usersContent, setUsersContent] = useState([]);
    const [isOpen, setIsOpen] = useState(false)
    const [currentPage, setCurrentPage] = useState(2)
    const [postsPerPage, setPostsPerPage] = useState(7)
    const [isClicked, setIsClicked] = useState(1)  //Pagination

    const lastPageIndex = currentPage * postsPerPage;
    const firstPageIndex = lastPageIndex - postsPerPage;


    const signOutHandler = () =>{
        auth.signOut()
          .then(()=>{
              localStorage.clear();
              navigate('/login');
          }
          )
          .catch((error) => console.log(`Error: ${error}`));
      }
      

    const deleteNote = (id) =>{
        const docReference = doc(db, `users/${user.uid}/notes`, id);
        deleteDoc(docReference);
    }

    const formOpen = () =>{
        setIsOpen(prevState => !prevState);
    }


    const handlePageClick = (index) =>{
        setCurrentPage(index)
    }

    useEffect(()=>{

      const getInfo = () =>{
        onSnapshot(queryOrder,(snapshot)=>{
          setUsersContent(snapshot.docs.map((doc) => ({...doc.data(), id: doc.id})))
        })

      }

      getInfo();
    },[])

    const currentPosts = usersContent.slice(firstPageIndex, lastPageIndex);

    const button = {
        rest: { scale: 1 },
        hover: { scale: 1.1, transition:{type:"spring", stiffness:100} },
        pressed: { scale: 0.95 },
        
      };
      const plus = {
        rest: { rotate: 0 },
        hover: { rotate: 360, transition: { duration: 0.5 } }
      };
      
    return(
        <>
            <div className="md:grid md:grid-cols-parent">
                <Sidebar 
                displayName={user.displayName}
                signOutHandler={signOutHandler}
                formOpen={formOpen}
                />

                <div 
                    className="
                    mx-auto
                    p-7 mt-10 md:mt-5
                    grid 
                    grid-cols-1
                    sm:grid-cols-2
                    md:grid-cols-3
                    lg:grid-cols-4
                    md:gap-y-0
                    gap-y-16
                    gap-x-14
                    "
                >

                {/* add button */}
                <motion.div 
                    className="
                    p-5 
                    border-2 border-[#6e3820] rounded-3xl
                    hidden  
                    max-w-[13rem]
                    max-h-[13rem]
                    cursor-pointer
                    active:bg-[#c37f37]
                    hover:bg-[#f9cdc0]
                    md:flex justify-center
                    "
                    onClick={formOpen}
                    variants={button}
                    whileHover="hover"
                    whileTap="pressed"
                >
                    <div className="border-2 rounded-3xl border-dashed border-[#dfb589] flex items-center justify-center sm:p-5 md:p-10 lg:p-10 xl:p-14">
                        <button className="">
                                <motion.img 
                                    src="https://img.icons8.com/ios/50/dfb589/plus-math--v1.png" 
                                    whileHover={{ rotate: 45 }}
                                    transition={{ duration: 0.6 }}
                                    variants={plus}
                                />
                        </button>
                    </div>
                   
                </motion.div>
                {
                    currentPosts.map((item)=>{
                        return(
                            <NoteCard
                                key = {item.id}
                                id = {item.id}
                                companion = {item.companion}
                                title = {item.title}
                                content={item.content}
                                deleteNote={deleteNote}
                            />  
                        )
                    })
                }
                </div>
                {
                    createPortal(
                        <FormPopup isOpen={isOpen} user={user} formOpen={formOpen}/>,
                        document.getElementById("portal")
                    )
                }
                
            </div>
            <Pagination  totalPosts={usersContent.length} postsPerPage={postsPerPage} currentPage={currentPage} handlePageClick={handlePageClick} setCurrentPage={setCurrentPage}/>
        </>
    )
}

export default ContentPage