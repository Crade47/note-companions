import { useState } from 'react'

export default function Pagination({totalPosts, postsPerPage, currentPage, handlePageClick, setCurrentPage}) {
    const pages = [];
    const totalPages = Math.ceil(totalPosts/postsPerPage);
    for (let index = 1; index <= totalPages; index++) {

        pages.push(index) 
        
    }
  

    const buttonStyle = " rounded-full bg-transparent bg-[#c87c54] p-3 shadow-xl";
    
    const backBtnClick = () =>{
        if(currentPage===1){
            setCurrentPage(totalPages);
        }else{
            setCurrentPage(prevState => prevState - 1);
        }
    }

    const fwdBtnClick = () =>{
        if(currentPage === totalPages){
            setCurrentPage(1);
        }else{
            setCurrentPage(prevState => prevState + 1)
        }
    }

    //absolute bottom-0 left-1/2 -translate-x-1/2 -translate-y-1/2

    return (
        <>
            <div className='grid mx-auto text-center md:absolute md:-bottom-3 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2'>

                <div className='flex gap-x-10 text-center mx-auto items-center justify-center'>

                    <button className={buttonStyle} onClick={backBtnClick}>
                        <img src="https://img.icons8.com/material-outlined/24/FFFFFF/long-arrow-left.png"/>
                    </button>

                    <div className='bg-[#d8c4b4] text-[#f8f4f4] flex gap-y-3 justify-center items-center shadow-lg rounded-3xl px-5'>
                        {
                            pages.map((page,index)=>{
                                const clickedBackground = currentPage === page ? 
                                "bg-[rgba(195,120,87,0.2)] text-[#c87c54] font-bold" 
                                : 
                                "bg-transparent text-white"
                                return (
                                    <button className={`mx-3 rounded-full h-[40px] w-[40px] leading-[40px] ${clickedBackground}`} 
                                    key={index} onClick={() => handlePageClick(page)}>{page}</button>
                                )
                            })
                        }
                    </div>

                    <button className={`flipImg ${buttonStyle}`} onClick={fwdBtnClick}>
                        <img src="https://img.icons8.com/material-outlined/24/FFFFFF/long-arrow-left.png"/>
                    </button>
                </div>
            </div>
        </>
    )
}
