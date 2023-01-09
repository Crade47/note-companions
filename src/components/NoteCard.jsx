import { useState } from "react"
import cowCard from '../assets/companions/cow/cow_card.png'
import pandaCard from '../assets/companions/panda/panda_card.png'
import monkeyCard from '../assets/companions/monkey/monkey_card.png'
import shibaCard from '../assets/companions/shiba/shiba_card.png'
function NoteCard(props) {
    const [showButton, setShowButton] = useState(false)
    const companion = props.companion;
    console.log(companion);
    const companion_Object = {
        "cow":{
            card: cowCard,
            cardColor: "bg-[#faa0a0]",
            titleColor: "text-[#57423F]",
            contentColor: "text-[#fff]",
            class: "absolute w-20 -top-12 -left-5"
        },
        "panda":{
            card: pandaCard,
            cardColor: "bg-[#4d474b]",
            titleColor: "text-[#a0acbc]",
            contentColor: "text-[#f9f7e8]",
            class: "absolute w-20 -top-7 -right-5 rotate-[20deg]"
        },
        "monkey":{
            card: monkeyCard,
            cardColor: "bg-[#836953]",
            titleColor: "text-[#e6d1ba]",
            contentColor: "text-[#dcbc8b]",
            class: "absolute w-20 -bottom-10 -right-5 flipImg rotate-12"
        },
        "shiba":{
            card: shibaCard,
            cardColor: "bg-[#f5ab7f]",
            titleColor: "text-[white]",
            contentColor: "text-[white]",
            class: "absolute w-16 -bottom-5 -left-7 flipImg "
        }
    }
    const titleComponent = () =>{
        const textClass = `
            ${companion_Object[companion]["titleColor"]} rounded-t-[10px] inline-block  text-lg
            ellipsis text-ellipsis 
        `
        return(
            <>
                <div className={textClass}>
                    {props.title}
                </div>
            </>
        )
    }

    const contentComponent = () =>{

        const contentClass = `
        inline-block
        py-2
        ${companion_Object[props.companion].contentColor}
        font-satoshiLight
        rounded-b-[20px]
        overflow-hidden
        text-ellipsis
        `

        return(
            <>  
                <div className={contentClass}>
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
            className={`
            grid grid-cols-1 
            max-w-[13rem]
            max-h-[13rem] 
            mx-auto
            md:mx-0 
            shadow-xl 
            ${companion_Object[companion].cardColor}  
            rounded-[20px] 
            p-7 
            relative hover:opacity-100`}
            onMouseEnter={() => setShowButton(prevState => !prevState)}
            onMouseLeave={() => setShowButton(prevState => !prevState)}

            >
                <img src={companion_Object[companion].card} alt={companion} className={companion_Object[companion].class} />
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