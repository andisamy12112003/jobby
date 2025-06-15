import { useEffect, useState } from "react"
import Header from "./Header"
import Cookies from "js-cookie"
import {v4 as uuidv4 } from "uuid"
import { FiSearch, FiStar } from "react-icons/fi"
import { AiFillStar } from "react-icons/ai"
import { IoBagSharp, IoLocation, IoSearchOutline } from "react-icons/io5"
import { Link } from "react-router"


function Jobs() {
  const [employ,setEmploy] = useState([])
  const [salary,setSalary] = useState("")
  const [searchInput,setSearchInput] = useState("")
  const [profileData,setProfileData] = useState({})
  const [jobsData,setJobsData] = useState([])
  let jwtToken = Cookies.get("jwtToken")
  console.log(searchInput)
{/*employment type array*/}
  const employmentType = [
    {
      id:uuidv4(),
      type:"Part Time",
      value:"PartTime"
    },
    {
      id:uuidv4(),
      type:"Full Time",
      value:"FullTime"
    },
    {
      id:uuidv4(),
      type:"Freelance",
      value:"Freelance"
    },
    {
      id:uuidv4(),
      type:"Internship",
      value:"Internship"
    }
  ]

{/*salary Range*/}

const salaryRange = [
  {
    id:uuidv4(),
    salaryrange:"10 LPA and Above",
    salary:"1000000"
  },
  {
    id:uuidv4(),
    salaryrange:"20 LPA and Above",
    salary:"2000000"
  },
  {
    id:uuidv4(),
    salaryrange:"30 LPA and Above",
    salary:"3000000"
  },
  {
    id:uuidv4(),
    salaryrange:"40 LPA and Above",
    salary:"4000000"
  },  
]

{/*convert profile data object properties to camelCase*/}

const convertCamalCaseProfile = (item) => {
  const updateCase = {
    name:item.name,
    ProfileImageUrl:item.profile_image_url,
    shortBio:item.short_bio
  }
  setProfileData(updateCase)  
}

{/*convert jobs data to camelCase*/}

const convertCamelCaseJobs = (jobData) =>{
  const convertData = jobData.map(item=>({
    companyLogoUrl:item.company_logo_url,
    employmentType:item.employment_type,
    id:item.id,
    jobDescription:item.job_description,
    location:item.location,
    packagePerAnnum:item.package_per_annum,
    rating:item.rating,
    title:item.title
  }))
  setJobsData(convertData)
}

{/*profile and jobs API call*/}

  useEffect(()=>{
  {/*Profile Api Call*/}
  const ProfileApiCall = async () => {
    const url = "https://apis.ccbp.in/profile"
    const options = {
      headers:{
        Authorization:`Bearer ${jwtToken}`,
      },
      method:"GET"
    }
    const response = await fetch(url,options)
    const data = await response.json()
    if(response.ok===true){
      convertCamalCaseProfile(data.profile_details)
    }
  }
  ProfileApiCall()    
},[jwtToken])

useEffect(()=>{
  {/*Jobs API Call */}
  const jobsApiCall = async () => {
    const url = `https://apis.ccbp.in/jobs?employment_type=${employ.join(",").toUpperCase()}&minimum_package=${salary}&search=${searchInput}`
    const options = {
      headers:{
        Authorization:`Bearer ${jwtToken}`,
      },
      method:"GET"
    }
    const response = await fetch(url,options)
    const data = await response.json()
    if(response.ok===true){
      convertCamelCaseJobs(data.jobs)
    }
    
    }
    jobsApiCall()
    
},[jwtToken,searchInput,salary,employ])

{/*add employment type filter values*/}
  const onEmploymentType = (event) => {
    let value = event.target.value
    let include = employ.includes(value)

    if(!include){
      setEmploy((prev)=>([...prev,value]))
      
    }
    if(include){
      let newValue = employ.filter(item=>item!==value)
      setEmploy(newValue)
    }
    
  }

{/*set salary range on state variable*/}
  const onSalaryRange = (event) => {
    let value = event.target.value
    setSalary(value)
  }

  return (
    <div>
      <Header />
    
      <div className="font-sans flex flex-row max-md:flex-col ">

      {/*filter container*/}
          <div className="max-md:flex max-md:flex-col max-md:w-full max-md:h-auto h-[90vh] bg-gray-900 box-border p-9 max-md:p-10 md:h-auto md:w-[25vw] "> 
      {/*profile container*/}
            <div className="bg-[url(./assets/profile-bg.png)] max-md:w-[60vw] max-md:h-auto max-md:p-8 w-auto h-55 bg-cover bg-center rounded-2xl box-border p-4 md:p-3">
              <img src={profileData.ProfileImageUrl} alt="" className="w-12" />
              <p className="text-blue-600 font-bold text-[20px] pt-2 md:text-[16px] lg:text-[18px] ">{profileData.name}</p>
              <p className="text-gray-800 font-[450] text-[16px] max-md:text-[17px] max-md:mt-4 lg:text-[16px] lg:mt-1 max-lg:text-[12px]">{profileData.shortBio}</p>
            </div>
            <hr className="text-white mt-3"/>

      {/*employment Type filter container*/}
            <div className="text-white">
              <h1 className="mt-5 text-md">Types of Employment</h1>
              <ul className="mt-3">
                {employmentType.map(items=>{
                  return(
                    <li className="mt-1 text-sm">
                      <input type="checkbox" id={items.id} value={items.value} onChange={onEmploymentType}/>
                      <label htmlFor={items.id}>{items.type}</label>
                    </li>
                  )
                })}
              </ul>
            </div>
          <hr className="text-white mt-3"/>

      {/*salary Type filter container*/}
            <div className="text-white">
              <h1 className="mt-5 text-md">Salary Range</h1>
              <ul className="mt-3">
                {salaryRange.map(items=>{
                  return(
                    <li className="mt-1 text-sm">
                      <input type="radio" name="salaryRange" id={items.id} value={items.salary} 
                      onClick={onSalaryRange} />
                      <label htmlFor={items.id}>{items.salaryrange}</label>
                    </li>
                  )
                })}
              </ul>
            </div>  
          </div>
    

          {/*job Details container*/} 
            <ul className="max-md:w-full md:w-full md:h-[120vh] bg-gray-900 h-[90vh] max-[1025px]:h-[100vh] max-[769px]:h-[120vh] box-border overflow-scroll no-scrollbar ">

          {/*search container*/}
            <div className="m-12 flex max-sm:-mb-6">
                <input type="search" className="max-sm:w-50 border-1 p-1 border-white outline-0 
                text-white w-70 max-sm:h-7" onChange={(event)=>(setSearchInput(event.target.value))} value={searchInput}/>
                <div className="border-1 border-white border-l-0 p-2 max-sm:p-[2px] flex items-center">
                <IoSearchOutline className="text-white text-xl font-bold max-sm:text-lg  " />
                </div>
            </div>

            {/*job list container*/}
                {jobsData.map(eachItem=>{
                  return(
                    <Link to={eachItem.id}>
                      <li key={eachItem.id} className="p-10 text-white m-12 w-auto h-auto bg-gray-600 rounded-2xl box-border">

                      {/*company logo and ratings*/}
                          <div className="flex">
                            <img src={eachItem.companyLogoUrl} alt="companyLogo" className="w-16" />
                            <div className="ml-4">
                              <p className="font-bold text-[20px] max-sm:text-[14px]">{eachItem.title}</p>
                              <div className="flex mt-2 max-md:text-[14px]">
                                <AiFillStar className="text-yellow-400 text-xl mt-0.5 max-md:text-lg "/>
                                <p className="ml-1 font-bold ">{eachItem.rating}</p>
                              </div>
                            </div>
                          </div>

                      {/*lacation and job LPA details*/}
                          <div className="mt-10 max-sm:text-[12px] ">
                            <div className="flex justify-between max-[321px]:flex-col">
                              <div className="flex mb-2 max-[376px]:flex-col max-[376px]:justify-start max-[376px]:items-start">
                                <div className="flex justify-center items-center">
                                  <IoLocation/>
                                  <p className="ml-1">{eachItem.location}</p>
                                </div>
                                <div className="ml-2 max-[376px]:ml-0 flex justify-center items-center">
                                  <IoBagSharp/>
                                  <p className="ml-1">{eachItem.employmentType}</p>
                                </div>
                              </div>
                              <div>
                                <h1>{eachItem.packagePerAnnum}</h1>
                              </div>
                            </div>
                            <hr />
                          </div>

                        {/*job Description*/}
                          <div> 
                            <h1 className="my-2.5 text-[19px] max-sm:text-[16px] ">Description</h1>
                            <p className="max-sm:text-[12px] *:">{eachItem.jobDescription}</p>
                          </div>
                      </li>
                    </Link>
                  )
                })}
                
            </ul>
                
        </div>
          
    </div>
  )
}

export default Jobs