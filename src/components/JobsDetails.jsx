import { useParams } from 'react-router'
import Header from './Header'
import { useEffect, useState } from 'react'
import Cookies from "js-cookie"
import { IoBagSharp, IoLocation } from 'react-icons/io5'
import { AiFillStar } from 'react-icons/ai'
import { FaArrowUpRightFromSquare } from "react-icons/fa6";

function JobsDetails() {
    const {id} = useParams()
    const [jobDetails,setJobDetails] = useState({})
    const [similarJobData,setSimilarJobData] = useState([])
    const jwtToken = Cookies.get("jwtToken")
    
{/*convet job details data to camel case*/}
    const convertCamelCaseJobDetails = async (data) => {
         const updataJobDetail = await {
            companyLogoUrl:data.company_logo_url,
            companyWebsiteUrl:data.company_website_url,
            employmentType:data.employment_type,
            id:data.id,
            jobDescription:data.job_description,
            lifeAtCompany:{
                description:data.life_at_company.description,
                imageUrl:data.life_at_company.image_url
            },
            location:data.location,
            packagePerAnnum:data.package_per_annum,
            rating:data.rating,
            skills:data.skills.map(skillData=>({
                imageUrl:skillData.image_url,
                name:skillData.name
            })),
            title:data.title
        }
        setJobDetails(updataJobDetail)
    }

{/*similar jobs data convet to camel case*/}
    const convertCamelCaseSimilarJobsData = async (data) => {
        const updateData = await data.map(item=>({
            companyLogoUrl:item.company_logo_url,
            employmentType:item.employment_type,
            id:item.id,
            jobDescription:item.job_description,
            location:item.location,
            rating:item.rating,
            title:item.title
        }))    
        setSimilarJobData(updateData)
    }

{/*job details API call */}
    useEffect(()=>{
        const jobsDetailsApiCall = async () => {
            const url = `https://apis.ccbp.in/jobs/${id}`
            const options = {
              headers:{
                Authorization:`Bearer ${jwtToken}`,
              },
              method:"GET"
            }
            const response = await fetch(url,options)
            const data = await response.json()
            if(response.ok===true){
                convertCamelCaseJobDetails(data.job_details)
                convertCamelCaseSimilarJobsData(data.similar_jobs)
            } 
        }
        jobsDetailsApiCall()
    },[id,jwtToken])
    
{/*render job details*/}
    const renderJobDetails = () => {
        
        const {companyLogoUrl,companyWebsiteUrl,employmentType,id,jobDescription,lifeAtCompany,packagePerAnnum,location,rating,skills,title} = jobDetails


        return(
            <>
            {/*job Details container*/} 
               <ul className="max-md:w-full md:w-full w-[80vw] bg-gray-900 h-[90vh] box-border overflow-scroll no-scrollbar font-sans">

                {/*job list container*/}
                    <li key={id} className="p-10 text-white m-12 w-auto h-auto bg-gray-600 rounded-2xl box-border">

                            {/*company logo and ratings*/}
                                <div className="flex">
                                <img src={companyLogoUrl} alt="companyLogo" className="w-16 max-sm:size-12 " />
                                <div className="ml-4">
                                    <p className="font-bold text-[20px] max-sm:text-[13px]">{title}</p>
                                    <div className="flex mt-2 max-md:text-[14px]">
                                    <AiFillStar className="text-yellow-400 text-xl mt-0.5 max-md:text-lg max-sm:text-[14px]"/>
                                    <p className="ml-1 font-bold max-sm:text-[13px]">{rating}</p>
                                    </div>
                                </div>
                                </div>

                            {/*lacation and job LPA details*/}
                                <div className="mt-10 max-sm:text-[12px] ">
                                <div className="flex justify-between max-sm:-mt-6 max-[376px]:flex-col">
                                    <div className="flex mb-2 max-[376px]:flex-col max-[376px]:justify-start max-[376px]:items-start ">
                                    <div className="flex justify-center items-center ">
                                        <IoLocation className='text-2xl max-sm:text-[16px]' />
                                        <p className="ml-1 text-lg max-sm:text-[13px] ">{location}</p>
                                    </div>
                                    <div className="ml-3 flex justify-center items-center max-[376px]:ml-1">
                                        <IoBagSharp className='text-2xl max-sm:text-[13px]'/>
                                        <p className="ml-1 text-lg max-sm:text-[13px]">{employmentType}</p>
                                    </div>
                                    </div>
                                    <div>
                                    <h1 className='text-xl max-sm:text-[13px]'>{packagePerAnnum}</h1>
                                    </div>
                                </div>
                                <hr />
                                </div>

                            {/*job Description*/}
                                <div> 
                                <div className='flex items-center justify-between pointer-fine:'>
                                    <h1 className="my-2.5 max-sm:text-[16px] text-[25px] font-[500]">Description</h1>
                                    <div className='flex justify-center items-center '>
                                        <a href={companyWebsiteUrl} className='text-blue-400 text-[23px] max-sm:text-[15px]'> Visit </a>
                                        <FaArrowUpRightFromSquare className='text-blue-400 text-[17px] max-sm:text-[12px] m-1'/>
                                    </div>
                                </div>
                                    <p className="text-[20px] max-sm:text-[15px]">{jobDescription}</p>
                                </div>

                                {/*Skill container*/}
                                <div className='mt-2'>
                                <h1 className='text-[26px] font-[500] max-sm:text-lg'>Skills</h1>
                                <ul className='flex flex-wrap justify-between'>
                                {skills?.map((items)=>{
                                    const {imageUrl,name} = items
                                    return(
                                        <li className='m-2 '>
                                            <img src={imageUrl} alt={name} className='w-20 h-20 max-sm:size-12'/>
                                            <h1 className='text-center text-lg max-sm:text-[17px]'>{name}</h1>
                                        </li>
                                    )
                                }
                                )}
                                </ul>
                                </div>

                                {/*life at company descrition*/}
                                <div className='mt-2 flex w-full justify-center max-sm:flex-col sm:flex-col lg:flex-row'>
                                    <div>
                                        <h1 className='text-2xl mb-6 font-[500] max-sm:text-[18px]'>Life at Company</h1>
                                        <p className='text-2xl max-sm:text-[17px]'>
                                        {lifeAtCompany?.description}
                                        </p>
                                    </div>
                                    <div className=' mt-10'>
                                        <img src={lifeAtCompany?.imageUrl} className='w-300' alt="" />
                                    </div>
                                </div>
                            {/**/}


                            <div>
                        </div>
                    </li>
                                
                {/*similar jobs */}
                <div className='m-10 text-white '>
                    <ul className='flex justify-between box-border max-sm:flex-wrap max-lg:flex-wrap'>
                        {similarJobData.map(items=>(
                            <>
                                <li className='m-2  bg-gray-700 box-border p-10 rounded-lg'>
                                
                            {/* similar data company logo and rating*/}
                                <div className="flex ">
                                <img src={items.companyLogoUrl} alt="companyLogo" className="w-16 max-sm:size-12" />
                                <div className="ml-4">
                                    <p className="font-bold text-[20px] max-sm:text-[15px]">{items.title}</p>
                                    <div className="flex mt-2 max-md:text-[14px]">
                                    <AiFillStar className="text-yellow-400 text-xl mt-0.5 max-md:text-lg "/>
                                    <p className="ml-1 font-bold ">{items.rating}</p>
                                    </div>
                                </div>
                                </div>

                            {/*similar data job description*/}
                                <div> 
                                    <div className='flex items-center justify-between pointer-fine:'>
                                        <h1 className="my-2.5 max-sm:text-[16px] text-[25px] font-[500]">Description</h1>
                                    </div>
                                        <p className="max-sm:text-[15px] text-[20px]">{items.jobDescription}</p>
                                        
                                </div>

                                {/*similar data lacation and job details*/}
                                <div className="mt-10 max-sm:text-[12px] ">
                                <div className="flex justify-between max-sm:-mt-6 ">
                                    <div className="flex justify-between ">
                                        
                                        <div className="flex justify-center items-center ">
                                            <IoLocation className='text-2xl max-sm:text-[16px]' />
                                            <p   className="ml-1 text-lg max-sm:text-[13px] ">{items.location}</p>
                                        </div>

                                        <div className="ml-3 flex justify-center items-center">
                                            <IoBagSharp className='text-2xl max-sm:text-[13px]'/>
                                            <p className="ml-1 text-lg max-sm:text-[13px]">{items.employmentType}</p>
                                        </div>
                                    
                                    </div>
                                </div>
                            
                                </div>
                               
                                </li>
                            </>
                        ))}
                    </ul>
                </div>                  
                </ul>
            </>
        )
    }

  return (
    <div>
        <Header/>
        <div>
            {renderJobDetails()}   
        </div>
    </div>
  )
}

export default JobsDetails