import { useState } from 'react'

function Header(props) {
    const signInButton = () => {
        return(
        <button className="pl-1 md:pt-3" onClick={props.signInWithGoogle}>
          <img src="https://img.icons8.com/external-dreamstale-lineal-dreamstale/20/null/external-sign-in-interface-dreamstale-lineal-dreamstale.png" />
          
        </button>

        )
    }

    const signOutButton = ()=>{
        let string = props.userInfo.name;
        let displayName = string.match(/^\w+/);
        return(

            <div className='flex items-end p-2 gap-1'>
                <button className=''>
                    <img src="https://img.icons8.com/material-sharp/20/FFFFFF/user.png"/>
                </button>
                <h5 className='text-[0.75em] ml-1 text-white'>{displayName}</h5>
            </div>
            
        )
    }

  return (
    <>
      <div className={props.classProps}>
        <div className='md:block flex content-between justify-between p-2'>
        <div className="text-5xl md:text-[5xl] text-left font-inconsolata dark:text-white text-black">
          My Notes
        </div>
            {props.isLoggedIn ? signOutButton() : signInButton()}
        </div>
      </div>
    </>
  )
}

export default Header
