import { addDoc, collection, orderBy, serverTimestamp } from 'firebase/firestore';
import { useState, useEffect } from 'react'
import { db } from '../../firebase-config';
import { motion } from 'framer-motion';
import cowForm from '../assets/companions/cow/cow_form.png'
import monkeyForm from '../assets/companions/monkey/monkey_form.png'
import pandaForm from '../assets/companions/panda/panda_form.png'
import shibaForm from '../assets/companions/shiba/shiba_form.png'


export default function FormPopup({isOpen, user, formOpen}) {
    const userId = user.uid;
    if (!isOpen) {
        return null;
    }

    

    const companion_obj ={
        "cow" : cowForm,
        "monkey" : monkeyForm,
        "panda" : pandaForm,
        "shiba" : shibaForm,
        "none" : "https://img.icons8.com/external-line-adri-ansyah/250/b8650e/external-interface-basic-ui-line-adri-ansyah-11.png"
    }

    const usersCollectionRef = collection(db,`users/${userId}/notes`);
    const q = (usersCollectionRef, orderBy("createdAt"));

    const [textData, setTextData] = useState({
        title: "",
        content: "",
        companion: "none",
        createdAt: serverTimestamp()
    });

    const [isCompanionPage, setIsCompanionPage] = useState(false)

    const handleFormInput = (event) =>{ 
        const {name, value} = event.target;
        setTextData((prevState) =>{
            return{
                ...prevState,
                [name]: value
            }
        });   
    }


    const handleSubmit = (event) =>{
        event.preventDefault();

        if (textData.content==="" && textData.title==="") {
            alert('You need to fill atleast one section');
            setIsCompanionPage(false);
        }else{ 
            addDoc(usersCollectionRef, textData);
            event.target.reset();
            setTextData((prevState) =>({...prevState, title:"", content:""}));
            setIsCompanionPage(false);
            formOpen();
        }

    }


    const textInputPortion = () =>{
        return(
            <>
                <input 
                    type="text"
                    id='title'
                    name='title' 
                    placeholder='Title'
                    className='bg-transparent p-4 text-2xl md:text-3xl text-[#c37f37] font-inconsolata font-extrabold placeholder:text-[#c37f37] placeholder:font-normal focus:outline-none '
                    onChange={handleFormInput}

                />
                <div className="bg-[#c27420] h-[1px] w-full mx-auto"></div>
                <textarea
                    type="text-area"
                    id="content"
                    name="content"
                    placeholder="Content"
                    className="resize-none p-4 text-lg md:text-[1.5em] text-[#c37f37] font-satoshiLight bg-transparent  placeholder:text-[#c37f37] focus:outline-none h-[13rem]"
                    onChange={handleFormInput}
                />
            </>
        )
    }

    const companionPortion = () =>{
        return(
            <>
                        <button type='button' 
                            className='active:border-2 p-2 max-w-fit' 
                            onClick={(event) => {
                                        event.preventDefault()
                                        setIsCompanionPage(prevState => !prevState)
                                    }}
                        >
                            <img src="https://img.icons8.com/ios-filled/25/FFFFFF/long-arrow-left.png"/>
                        </button>
                        <h1 className='text-lg md:text-xl text-[#a16626] mx-auto py-2'>Companion</h1>
                        <div className="h-[1px] mx-auto w-3/12 bg-[#c37f37] mb-2"></div>
                        <div className="flex justify-center items-center gap-1">
                            
                            {
                                Object.entries(companion_obj).map(([key, value]) =>{
                                    return(
                                        <>
                                        
                                        <input 
                                        type="radio" 
                                        name="companion"
                                        id={key} 
                                        value={key} 
                                        checked={textData.companion===key} 
                                        onChange={handleFormInput}
                                        className="hidden"
                                        />

                                        <label htmlFor={key} className="cursor-pointer focus:opacity-100 opacity-40"  tabIndex="0">
                                                <img 
                                                    src={value} 
                                                    alt={`${key}-form`}
                                                />
                                        </label>
                                       
                                        </>
                                    )
                                })
                            }    
                        </div>
                        <div className='mx-auto mt-3 capitalize text-white font-inconsolata'>{textData.companion}</div>
            </>
        )
    }

    const formContainerVariant = {
        hidden:{
            opacity:0
        },
        visible:{
          
            opacity:1
            
        },
        transition:{duration: 0.1, ease:"easeInOut"}
    }

  return (
    <>
        <motion.div
            variants={formContainerVariant}
            initial="hidden"
            animate="visible"
        >
            <div className="fixed top-0 left-0 right-0 bottom-0 bg-[rgb(0,0,0,0.7)] h-screen w-screen z-50">
            </div>
            <div>

                <div 
                    className='
                    fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                    bg-[#dfb589] p-5 z-[51] rounded-[10px] min-w-[80%] 
                    md:min-w-fit lg:max-w-[10rem]
                    '

                >   
                        {/* closeButton */}
                        <button 
                        className='
                        absolute right-4 top-4 p-2
                        active:border-2 ' 
                        onClick={formOpen}> 
                            <img src="https://img.icons8.com/fluency-systems-regular/20/FFFFFF/multiply.png"/>
                        </button>
                        <form className='flex flex-col' onSubmit={handleSubmit}>

                            { isCompanionPage ? companionPortion() : textInputPortion()}

                            {
                                isCompanionPage ? (

                                <button type="submit"
                                    className='
                                        border-2 border-[#b8650e]
                                        text-md md:text-xl font-chivoMono text-[#c37f37]
                                        max-w-fit
                                        mx-auto px-3 py-1
                                        mt-10
                                    ' 
                                >
                                    Submit
                                </button>
                                )
                                :
                                (

                                    <button 
                                        type='button'
                                        className='
                                            border-2 border-[#b8650e]
                                            text-md md:text-xl font-chivoMono text-[#c37f37]
                                            max-w-fit
                                            mx-auto px-3 py-1
                                            mt-10
                                        '
                                        onClick={(event) => {
                                            event.preventDefault()
                                            setIsCompanionPage(prevState => !prevState)
                                        }} 
                                    >
                                        Select Companion
                                    </button>
                                )
                            }


                        </form>
                </div>
            </div>
        </motion.div>
    </>
  )
}
