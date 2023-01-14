import { motion } from 'framer-motion';

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

    const buttonVariant = {
        hover: {scale:1.1},
        tap: {scale: 0.8}
    }

    const pageVariant = {
        initial: {y:0},
        motion: {y:[0,3,0]}
    }

    return (
        <>
            <div className='grid mx-auto text-center md:absolute md:-bottom-3 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2'>

                <div className='flex gap-x-10 text-center mx-auto items-center justify-center'>

                    <motion.button className={buttonStyle} onClick={backBtnClick} variants={buttonVariant} whileHover="hover" whileTap="tap">
                        <img src="https://img.icons8.com/ios/24/FFFFFF/long-arrow-left.png"/>
                    </motion.button>

                    <div className='bg-[#d8c4b4] text-[#f8f4f4] flex gap-y-3 justify-center items-center shadow-lg rounded-3xl py-1 px-5'>
                        {
                            pages.map((page,index)=>{
                                const clickedBackground = currentPage === page ? 
                                "bg-[rgba(195,120,87,0.2)] text-[#c87c54] font-bold" 
                                : 
                                "bg-transparent text-white"
                                return (
                                    <motion.button 
                                        className={`mx-3 rounded-full h-[40px] w-[40px] leading-[40px] ${clickedBackground}`} 
                                        key={index} 
                                        onClick={() => handlePageClick(page)}
                                        variants={pageVariant}
                                        initial="initial"
                                        animate="motion"
                                        whileTap="motion"
                                    >
                                        {page}
                                    </motion.button>
                                )
                            })
                        }
                    </div>

                    <motion.button className={buttonStyle} onClick={fwdBtnClick} variants={buttonVariant} whileHover="hover" whileTap="tap">
                        <img src="https://img.icons8.com/ios/24/FFFFFF/long-arrow-right--v1.png"/>
                    </motion.button>
                </div>
            </div>
        </>
    )
}
