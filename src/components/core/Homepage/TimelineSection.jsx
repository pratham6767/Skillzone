import React from 'react'
import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg";
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg";
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg";
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg";
import TimeLineImage from "../../../assets/Images/TimelineImage.png";

const TimeLine = [
    {
      Logo: Logo1,
      Heading: "Leadership",
      Description: "Fully committed to the success company",
    },
    {
      Logo: Logo2,
      Heading: "Responsibility",
      Description: "Students will always be our top priority",
    },
    {
      Logo: Logo3,
      Heading: "Flexibility",
      Description: "The ability to switch is an important skills",
    },
    {
      Logo: Logo4,
      Heading: "Solve the problem",
      Description: "Code your way to a solution",
    },
  ];


const TimelineSection = () => {
  
  return (
    <div className='w-11/12 mx-auto items-center justify-between flex flex-row gap-15' >

      {/* left part */}
      <div className='flex flex-col items-start w-[45%] gap-5'>
        {
          TimeLine.map((element,index)=>{
            return(
              <div className='flex flex-col items-start'>
                <div className='flex flex-row gap-6 ' key={index +" "}>


                <div className='w-[50px] h-[50px] rounded-full  bg-white flex items-center mx-auto'>
                  <img src={element.Logo} className={`${index===0?"mx-[5px]":""}`} alt='logo1'></img>
                </div>

                <div className='flex flex-col justify-between gap-1'>
                  <h1 className='font-semibold text-[18px]'>{element.Heading}</h1>
                  <p className=' text-[14px] line'>{element.Description}</p>
                </div>
                </div>
                
                <div className={`${TimeLine.length-1===index? "hidden":"block"} h-14 border-dotted border-r border-richblack-100 bg-richblack-400/0 w-[13px]`}></div>
              </div>
            )
          })
        }
      </div>


      {/* right image section */}

      <div className='relative shadow-blue-200'>
        <img src={TimeLineImage} alt='timeline_img' className='shadow-white object-cover lg:h-fit'/>
        
        <div className='absolute bg-caribbeangreen-700 flex flex-row text-white uppercase py-6 lg:left-[50%] lg:bottom-0 lg:translate-x-[-50%] lg:translate-y-[50%] w-[511px]'>
          <div className='flex flex-row gap-5 items-center border-r border-caribbeangreen-300 px-7'>
            <p className='text-3xl font-bold '>10</p>
            <p className='text-caribbeangreen-300 text-sm '>Years experiences</p>
          </div>

          <div className='flex flex-row gap-5 items-center ml-4 px-2'>
            <p className='text-3xl font-bold '>250</p>
            <p className='text-caribbeangreen-300 text-sm '>Type of Cources</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TimelineSection