import { useState, useEffect } from "react";
import UserContext from "./userContext";

const UserState = (props) =>{
    const [userInfo, setUserInfo] = useState({
        uid:"",
        displayName: "",
        photoURL: ""
    })

    useEffect(() => {
        // Try to retrieve the user's information from local storage
        const storedUserInfo = getUserInfoFromLocalStorage();
    
        if (storedUserInfo) {
          // Update the user context with the stored user information
          setUserInfo(storedUserInfo);
        }
    }, []);

    function getUserInfoFromLocalStorage() {
        const uid = localStorage.getItem("uid");
        const displayName = localStorage.getItem("displayName");
        const photoURL = localStorage.getItem("photoURL");
        
        if (uid && displayName && photoURL) {
            return {
            uid,
            displayName,
            photoURL,
            };
        }
        
        return null;
    }
    
    function setUserInfoInLocal(userInfo) {
        localStorage.setItem("uid", userInfo.uid);
        localStorage.setItem("displayName", userInfo.displayName);
        localStorage.setItem("photoURL", userInfo.photoURL);
    }
      



    return(
        <UserContext.Provider value={{userInfo, setUserInfo, setUserInfoInLocal}}>
            {props.children} 
        </UserContext.Provider>
    )
}

export default UserState;