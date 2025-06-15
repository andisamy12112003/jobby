import logo from "../assets/logo.png"
import { AiFillHome } from "react-icons/ai";
import { FiLogOut } from "react-icons/fi";
import { IoBagSharp } from "react-icons/io5";
import {useNavigate} from "react-router";
import Cookies from "js-cookie"
import { useContext } from "react";
import { AppContext } from "./Context";

function Header() {
    const navigate = useNavigate()
    const {auth,setAuth} = useContext(AppContext)
    console.log(auth)
    const logoutHomePage = () => {
        navigate("/login",{replace:true})
        setAuth(false)
        Cookies.remove("jwtToken")
    }

  return (
    <div>
        {/*md lg xl view*/}
        <div className="bg-gray-700 w-auto h-[10vh] flex justify-between box-border p-4 items-center max-sm:hidden">
        <div>   
            <img src={logo} alt="" className="w-35 p-3" onClick={()=>navigate("/")} />
        </div>
        <div className="flex text-lg text-white gap-8 font-bold ">
            <p className="active:text-blue-700 cursor-[pointer]" onClick={()=>navigate("/")}>Home</p>
            <p className="active:text-blue-700 cursor-[pointer]" onClick={()=>navigate("/jobs")}>Jobs</p>
        </div>
        <div>
            <button className="bg-blue-700  rounded-lg w-25 h-10 text-white font-bold" onClick={logoutHomePage}>Logout</button>
        </div>
    </div>


    {/*sm view*/}
    <div className="bg-gray-700 w-auto h-[10vh] flex justify-between box-border p-4 items-center sm:hidden md:hidden">
        <div>   
            <img src={logo} alt="" className="w-30 p-3" onClick={()=>navigate("/")}/>
        </div>
        <div className="flex text-xl text-white gap-5 font-bold ">
            <AiFillHome className="size-6 active:text-blue-500" onClick={()=>navigate("/")}/>
            <IoBagSharp className="size-6 active:text-blue-500" onClick={()=>navigate("/jobs")}/>
            <FiLogOut className="size-6 text-white" onClick={logoutHomePage}/>
        </div>
    </div>
    </div>
  )
}

export default Header