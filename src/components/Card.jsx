import { useState } from "react"

function Card (props){
    
    return(
        <>
    
            <div className="card">
            <h2 className="text-2xl">{props.title ?? "New Note"}</h2>
            <div className="h-[1px] bg-black"></div>
            <p className="text-white text-xl mt-2">{props.content=="" || props.content==undefined ? "--no-content--" : props.content}</p>
            <button onClick={() => props.deleteNote(props.id)} className="border-[1px] border-black">Delete</button>
            </div>
            
        </>   
    )
}

export default Card;