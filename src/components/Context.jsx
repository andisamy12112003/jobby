import { createContext, useState } from "react";
import Cookies from "js-cookie"

export const AppContext = createContext()

const ContextProvider = (props) => {
    const authorization = Cookies.get("auth")
    
    console.log(authorization)
    const [auth,setAuth] = useState(authorization)
    
    return (
        <AppContext.Provider value={{auth,setAuth}}>
            {props.children}
        </AppContext.Provider>
    )
} 

export default ContextProvider