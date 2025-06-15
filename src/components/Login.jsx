import { useContext, useState } from "react"
import logo from "../assets/logo.png"
import Cookies from "js-cookie"
import { useNavigate } from "react-router-dom";
import { AppContext } from "./Context";

function Login() {
  const [username,setUsername] = useState("")
  const [password,setPassword] = useState("")
  const [showPassword,setShowPassword] = useState(true)
  const [errormsg,setErrorMessage] = useState("")
  const navigate = useNavigate()
  const {auth,setAuth} = useContext(AppContext)

  {/*Login User  Api call*/}
  const loginUser = async () => {
    
    const userDetails = {username,password} 
    const url = "https://apis.ccbp.in/login"
    const options = {
      method:"POST",
      body:JSON.stringify(userDetails)  
    }
    const response =await fetch(url,options)
    const data = await response.json()

    if(response.ok===true){
      navigateHomePage(data.jwt_token)
    }else{
      setErrorMessage("**"+data.error_msg)
    }
  }
  
  {/*if api call success*/}
  const navigateHomePage = (jwtToken) => {
    navigate("/",{replace:true})
    setAuth(true)
    Cookies.set("auth",auth,{expires:12222})
    Cookies.set("jwtToken",jwtToken,{expires:300 })
  }

  return (
    <div className="w-full h-[100vh] bg-black flex flex-col justify-center items-center max-sm:p-8">
        <div className="w-[400px] h-[430px] bg-gray-700 rounded-2xl max-sm:w-full max-sm:p-2 max-sm:h-auto ">
            <div className="w-full flex justify-center">
                <img className="w-47 h-12 m-8" src={logo} alt="logo" />
            </div>
            <div className="flex justify-center ">
               <div className="w-80">
                {/*user username*/}
                    <label className="text-white font-bold text-[17px] ">Username</label><br/>
                    <input type="input" value={username} onChange={(event)=>setUsername(event.target.value)} className="border-2 border-gray-500 w-full h-9 outline-none text-white p-2 my-2"/><br/>
                {/*user Password*/}
                    <label className="text-white font-bold text-[17px] ">Password</label><br/>
                    <input type={showPassword?"password":"text"} value={password} 
                    onChange={(event)=>setPassword(event.target.value)} className="border-2 border-gray-500 w-full h-9 text-white outline-none p-2 my-2 "/>
                {/*show password*/}
                    <div >
                        <input type="checkbox" id="showPass" className="m-1" onChange={()=>setShowPassword(!showPassword)}/><label htmlFor="showPass" className="text-white font-bold ml-1" 
                        >Show Password</label>
                    </div>
                {/*error msg*/}
                    <div>
                      <p className="text-red-400 font-bold">{errormsg}</p>
                    </div>
                {/*Login btn*/}
                    <div>
                      <button className="w-full bg-blue-600 text-white my-5 p-3 rounded-xl font-bold " onClick={loginUser}>Login</button>
                    </div>
               </div>
            </div>
        </div>
    </div>
  )
}

export default Login