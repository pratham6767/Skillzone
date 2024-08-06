import React from 'react'
import {FaArrowRight} from 'react-icons/fa'
import { Link } from 'react-router-dom'
import HighlightText from '../components/core/Homepage/HighlightText'
import CTABUTTON from '../components/core/Homepage/Button.jsx'
import Banner from '../assets/Images/banner.mp4'
import CodeBlocks from '../components/core/Homepage/CodeBlocks.jsx'
import LearnLanguageSection from '../components/core/Homepage/LearnLanguageSection.jsx'
import TimelineSection from '../components/core/Homepage/TimelineSection.jsx'
import InstructorSection from '../components/core/Homepage/InstructorSection.jsx'
import ReviewSlider from '../components/core/Homepage/ReviewSlider.jsx'
import ExploreMore from '../components/core/Homepage/ExploreMore.jsx'
import Footer from '../components/common/Footer.jsx'

const Home = () => {
  return (
    <div>
        {/* section 1 */}
        <div className='relative mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 text-white'>
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

          <div className=' mx-3 my-12 shadow-[10px_-5px_50px_-5px] shadow-blue-200 '>
            <video loop muted autoPlay className='shadow-[20px_20px_rgba(255,255,255)]'>
              <source src={Banner} type='video/mp4'/>
            </video>
          </div>
          
          {/* code section 1 */}
          <div>
          <CodeBlocks
            position={"lg:flex-row"}
            heading={
              <div className="text-4xl font-semibold">
                Unlock your
                <HighlightText text={"coding potential"} /> with our online
                courses.
              </div>
            }
            subheading={
              "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
            }
            ctabtn1={{
              btnText: "Try it Yourself",
              link: "/signup",
              active: true,
            }}
            ctabtn2={{
              btnText: "Learn More",
              link: "/signup",
              active: false,
            }}
            codeColor={"text-yellow-25"}
            codeblock={`<!DOCTYPE html>\n <html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a>\n</nav>\n</body>`}
            backgroundGradient={<div className="codeblock1 absolute"></div>}
          />
          </div>

          {/* code section 2 */}

          <div>
          <CodeBlocks
            position={"lg:flex-row-reverse"}
            heading={
              <div className="text-4xl font-semibold w-[250px]">
                Start
                <HighlightText text={"\nCoding in Seconds"} /> 
              </div>
            }
            subheading={
              "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
            }
            ctabtn1={{
              btnText: "Continue Lesson",
              link: "/signup",
              active: true,
            }}
            ctabtn2={{
              btnText: "Learn More",
              link: "/signup",
              active: false,
            }}
            codeColor={"text-yellow-25"}
            codeblock={`<!DOCTYPE html>\n <html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a>\n</nav>\n</body>`}
            backgroundGradient={<div className="codeblock1 absolute"></div>}
          />
          </div>
          <ExploreMore />
        </div>
        {/* section 2 */}
        <div className='bg-pure-greys-5 text-richblack-700'>
            <div className='homepage_bg h-[310px]'>

              <div className='w-11/12 flex-col max-w-maxContent flex items-center gap-5 mx-auto'>
                <div className='h-[150px]'></div>
                <div className='flex gap-7 text-white'>
                  
                  <CTABUTTON active={true} linkto={"/signup"}>
                    <div className='flex flex-row items-center gap-2'> 
                    Explore Full Catalog
                    <FaArrowRight/>
                    </div>
                  </CTABUTTON>
                  <CTABUTTON active={false} linkto={"/signup"}>
                    <div className='items-center '> 
                    Learn More
                    
                    </div>
                  </CTABUTTON>
                </div>
              </div>
              
            </div>
            <div className='mx-auto w-11/12 max-width-Content flex flex-col gap-7 items-center justify-between gf'>
              <div className='flex justify-between mt-[95px] mb-10'>
                <div className='text-4xl font-semibold w-[47%]'>
                Get the skills you need for a <HighlightText text={'job that is in demand.'}/>
                </div>
                <div className='flex flex-col justify-between gap-10 w-[43%] items-start'>
                  <p className='text-[16px]'>The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.</p>
                  <CTABUTTON active={true} linkto={"/signup"}>
                    Learn More
                  </CTABUTTON>
                </div>
              </div>
              <TimelineSection/>
            <LearnLanguageSection/>
            </div>

            
        </div>
        {/* section 3 */}

        <div className='mx-auto flex max-w-maxContent flex-col w-11/12 relative items-center gap-8 bg-richblack-900 text-white'>
          
          <InstructorSection/>
          <h1 className="text-center text-4xl font-semibold mt-8">
            Reviews from other learners
          </h1>
        <ReviewSlider />
        </div>
        {/* footer */}
        <Footer/>
    </div>
  )
}

export default Home