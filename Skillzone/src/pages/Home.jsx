import React from 'react'
import {FaArrowRight} from 'react-icons/fa'
import { Link } from 'react-router-dom'
import HighlightText from '../components/core/Homepage/HighlightText'
import CTABUTTON from '../components/core/Homepage/Button.jsx'
const Home = () => {
  return (
    <div>
        {/* section 1 */}
        <div className='mx-auto flex max-w-maxContent flex-col w-11/12 relative items-center'>
            <Link to='/signup'>
            <div className='mt-16 p-1 rounded-full mx-auto bg-richblack-800 drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] font-bold text-richblack-200 transition-all duration-200 group hover:scale-95'>
                <div className='flex flex-row mx-auto items-center group-hover:bg-richblack-900 gap-2 rounded-full px-10 py-[5px]'>
                    <p >Become an Instructor</p>
                    <FaArrowRight/>
                </div>
            </div>
            </Link>
          <div className='text-center mx-auto text-4xl font-semibold mt-7'>
            Empower Your Future with
            <HighlightText text="Coding Skill"/>
          </div>

          <div className='text-center mx-auto w-[87%] text-lg font-bold text-richblack-300 mt-4'>
          With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors. 
          </div>

          <div className='flex flex-row gap-7 justify-between mt-8'>
            <CTABUTTON active={true} Linkto={"/signup"}>
              Learn More
            </CTABUTTON>

            <CTABUTTON active={false} Linkto={"/login"}>
              Book a Demo
            </CTABUTTON>

          </div>
        </div>
        {/* section 2 */}
        {/* section 3 */}
        {/* footer */}
    </div>
  )
}

export default Home