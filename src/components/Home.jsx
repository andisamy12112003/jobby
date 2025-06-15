import { useNavigate } from "react-router"
import Header from "./Header"
function Home() {
const navigate = useNavigate()
  return (
    <div>
        <Header/>
        <div className="sm:bg-[url(./assets/HomeBgImage.png)] max-sm:bg-[url(./assets/HomeSmImage.png)] bg-center bg-cover w-auto h-[90vh] font-sans">
          <div className="p-10 ">
            <h1 className="font-bold text-white capitalize max-sm:text-[40px] max-md:text-[50px]  text-[80px] box-border">find the job that <br /> fits your life</h1>
            <p className="text-white text-2xl w-150 max-sm:w-auto max-sm:text-lg max-md:text-xl pt-5 font-light">
              Millions of people searching for jobs,Salary informations company reviews.Find the jobs that fits your abilities and potential.</p>
            <div className="pt-9">
            <button onClick={()=>navigate("/jobs")} className="bg-blue-700 rounded-lg w-25 h-10 text-white font-bold">Find Jobs</button>
            </div>
          </div>

        </div>
    </div>
  )
}

export default Home