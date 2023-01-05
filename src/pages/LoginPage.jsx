import { signInWithPopup } from "firebase/auth"
import { useContext, useEffect, useState } from "react"
import { Navigate } from "react-router-dom";
import { auth, provider } from "../../firebase-config"
import userContext from "../context/userContext"
import loginImage from "../assets/sadcomputer.png"

function LoginPage(){
    const [userInfo, setUserInfo] = useState({
        uid:"",
        displayName: "",
        photoURL: ""
    })
    const userContextObj = useContext(userContext);
    const [shouldRedirect, setShouldRedirect] = useState(false);

    const handleSignIn = async () =>{
        try{
            const result = await signInWithPopup(auth, provider)
            setUserInfo({
                uid:result.user.uid,
                displayName: result.user.displayName, 
                photoURL: result.user.photoURL
            })
            setShouldRedirect(prevState => !prevState)
        }
        catch(error){
            console.log(error);
        }
    }

    useEffect(() =>{
        console.log(userInfo);
        localStorage.setItem("user", JSON.stringify(userInfo));

    },[userInfo])
    

    return(
        <>
              
            <div className="flex justify-center items-center flex-col h-screen">
                <img src={loginImage} alt="notLoggedIn" className="aspect-square h-40" />
                <h1 className="text-xl md:text-2xl font-chivoMono pt-4">You are not logged in :(</h1>
             
                <button 
                    className="aspect-square mt-6"
                    onClick={handleSignIn}
                >
                    <img src="https://img.icons8.com/bubbles/70/null/google-logo.png"/>
                </button>
                {shouldRedirect && <Navigate to="/content"/>}
            </div>
        </>
    )
}

export default LoginPage