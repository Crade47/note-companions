import { useState } from "react"
import cowCard from '../assets/companions/cow/cow_card.png'
function NoteCard(props) {
    const [showButton, setShowButton] = useState(false)


    const titleComponent = () =>{
        return(
            <>
                <div className="  text-[#57423F] rounded-t-[10px]   inline-block font-rowanMedium text-lg
                ellipsis text-ellipsis 
                ">
                    {props.title}
                </div>
            </>
        )
    }

    const contentComponent = () =>{
        return(
            <>  
                <div className="   
                inline-block
                py-2
                text-white
                font-satoshiLight
                rounded-b-[20px]
                overflow-hidden
                text-ellipsis
                ">
                    <span className="">

                    {props.content}
                    </span>
                    
                </div> 
            </>
        )
    }


    return(
        <>      
            <div 
            className="
            grid grid-cols-1 
            max-w-[13rem]
            max-h-[13rem]
            mx-auto
            md:mx-0
            shadow-2xl
            bg-[#faa0a0]  
            rounded-[20px] 
            p-7
            relative hover:opacity-100"
            onMouseEnter={() => setShowButton(prevState => !prevState)}
            onMouseLeave={() => setShowButton(prevState => !prevState)}

            >
                {/*Title Field*/}
                

                {props.title && titleComponent()}
                  
                {props.content && contentComponent()}  
                {showButton &&(
                    <button className="rounded-full bg-[#ff5d5d] p-2  absolute -bottom-2 -right-2 " onClick={()=>props.deleteNote(props.id)}>
                        <img src="https://img.icons8.com/pastel-glyph/23/FFFFFF/trash.png"/>
                    </button> 
                ) 
                }
            </div>

        </>
    )
}

export default NoteCard