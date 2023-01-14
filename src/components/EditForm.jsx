import { doc, updateDoc } from 'firebase/firestore';
import { useState } from 'react'
import { db } from '../../firebase-config'
import { motion } from 'framer-motion'

export default function EditForm({companion_Object, companion, editNoteWindow, title, content, id, deleteNote}) {
    const isNone = companion === "none" ? true : false;
    const crossColor = companion === "none" ? "000000" : "FFFFFF"
    const user = JSON.parse(localStorage.getItem("user"));
    const [textData, setTextData] = useState({
        title:title,
        content:content
    })

    const docRef = doc(db, `users/${user.uid}/notes/${id}`);


    const handleFormInput = (event) =>{ 
        const {name, value} = event.target;
        setTextData((prevState) =>{
            return{
                ...prevState,
                [name]: value
            }
        });  
        
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        try {
            updateDoc(docRef, textData);
        } catch (error) {
            console.log(error);
        }
        editNoteWindow();
    }

    const buttonVariant = {
        tap:{
            opacity:0,
            transition:{duration: 0.1}
        }
    };

  return (
    <>
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-[rgb(0,0,0,0.7)] h-screen w-screen z-50"></div>

    {}
    <div className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${companion_Object[companion].cardColor} p-5 z-50 rounded-[10px] min-w-[80%] md:min-w-fit lg:max-w-[10rem]`} >

        <form className='grid grid-cols-1' onSubmit={handleSubmit} >

            {!isNone && <img src={companion_Object[companion].card} alt={companion} className={companion_Object[companion].class} style={{width: "6rem"}}/>}

            <motion.button 
                className='absolute right-4 top-4 p-4 active:border-2 ' 
                onClick={(e)=> {e.preventDefault(); editNoteWindow()}}
                whileTap={{scale:0.9, originX: 0.7}}
            > 
                            <img src={`https://img.icons8.com/fluency-systems-regular/20/${crossColor}/multiply.png`}/>
            </motion.button>
            <input 
                type="text"
                id='title'
                name='title' 
                placeholder='Title'
                className={`bg-transparent p-4 text-2xl md:text-3xl ${companion_Object[companion].titleColor} font-inconsolata font-extrabold placeholder:text-[#c37f37] placeholder:font-normal focus:outline-none mt-5`}
                onChange={handleFormInput}
                value={textData.title}

            />
            <div className="bg-[#c27420] h-[1px] w-full mx-auto"></div>
            <textarea
                type="text-area"
                id="content"
                name="content"
                placeholder="Content"
                className={`resize-none p-4 text-lg md:text-[1.5em] ${companion_Object[companion].contentColor} font-satoshiLight bg-transparent  placeholder:text-[#c37f37] focus:outline-none h-[13rem]`}
                value={textData.content}
                onChange={handleFormInput}
            />

            <div className=' justify-self-end flex items-end justify-center gap-4'>
            <motion.button 
                className="px-3 py-[0.4rem] border-2 border-[#b8650e]" 
                onClick={()=> deleteNote( id)}
                variants={buttonVariant}
                whileTap="tap"
            >
                <img src="https://img.icons8.com/pastel-glyph/23/c37f37/trash.png"/>
            </motion.button> 
            <motion.button type="submit"
                className='
                    border-2 border-[#b8650e]
                    text-md md:text-xl font-chivoMono text-[#c37f37]
                    max-w-fit
                    px-3 py-1
                    mt-10
                    
                ' 
                variants={buttonVariant}
                whileTap="tap"
            >
                Submit
            </motion.button>
            </div>
        </form>

    </div>
</>
  )
}
