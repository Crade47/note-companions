import logo from '../assets/logo.png'
import addButton from '../assets/add-button-mobile.png'
function Sidebar(props) {
    const displayName = props.displayName.match(/^\w+/);

    return(
        <>
            <aside className="text-xl 
            w-screen md:max-w-fit md:h-screen 
            border-b-[1.5px] md:border-r-[1.5px] md:border-b-0 rounded-sm
            flex justify-end
            md:grid
            backdrop-blur
            inline-block md:float-left
            bg-[#c37857]
            
            ">
                <img src={logo} alt="logo" className='w-[7rem] mr-auto '/>
                <button className='border-spacing-0 p-0 rounded-full absolute left-[50%] -translate-x-2/4 top-[83px] mx-auto' onClick={props.formOpen}>
                    <img src={addButton} alt="addButton" className='md:hidden' width={60} />
                </button>
                <div className="grid grid-cols-[20px_90%] md:grid-rows-[15%_15%] 
                md:gap-y-5 md:mt-auto md:mb-5 
                items-center 
                mr-4 md:mx-auto">

                    <button className=''>
                        <img src="https://img.icons8.com/material-sharp/15/fcead5/user.png"/>
                    </button>
                    <h3 className="text-xs text-[#fcead5] md:text-sm">{displayName}</h3>

                    
                    
                        <button className='' onClick={props.signOutHandler}>
                            <img src="https://img.icons8.com/external-inkubators-detailed-outline-inkubators/15/fcead5/external-sign-out-video-interface-inkubators-detailed-outline-inkubators.png"/>                    
                        </button>
                        <h3 className="text-xs text-[#fcead5]  md:text-sm cursor-pointer" onClick={props.signOutHandler} >Sign Out</h3>
            
                </div>
            </aside>
            
        </>
    )
}


// flex flex-col gap-2 items-center md:items-end 
//                 md:pt-2  mt-0 mb-0 mr-4 md:mx-auto md:my-0

export default Sidebar