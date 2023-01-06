import { useState } from "react"

function NoteCard(props) {
    const [showButton, setShowButton] = useState(false)
    return(
        <>      
            <div 
            className="
            grid grid-cols-1 
            max-w-[13rem]
   
            mx-auto
            md:mx-0
            shadow-2xl 
            rounded-[20px] 
            relative hover:opacity-100"
            onMouseEnter={() => setShowButton(prevState => !prevState)}
            onMouseLeave={() => setShowButton(prevState => !prevState)}

            >
                {/*Title Field*/}
                <div className=" bg-[#B9CD94] text-[#57423F] rounded-t-[10px]  px-7 py-4 inline-block font-rowanMedium text-lg
                ellipsis text-ellipsis 
                ">
                    {props.title}
                </div>

                {/*Title Field*/}
                <div className=" bg-[#faa0a0]  
                px-7 py-6 inline-block
                text-white
                font-satoshiLight
                rounded-b-[20px]
                
                ellipsis
                ">
                    <span className="ellipsis-inner">

                    {props.content}
                    </span>
                    
                </div>     
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