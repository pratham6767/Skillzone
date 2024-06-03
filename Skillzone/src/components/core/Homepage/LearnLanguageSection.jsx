import React from 'react'
import HighlightText from './HighlightText'
import CTABUTTON from '../Homepage/Button' 
import Know_your_progress from "../../../assets/Images/Know_your_progress.png";
import Compare_with_others from "../../../assets/Images/Compare_with_others.svg";
import Plan_your_lessons from "../../../assets/Images/Plan_your_lessons.svg";
const LearnLanguageSection = () => {
  return (
    <div className='mt-[110px] mb-20'>
      <div className='flex flex-col gap-5 items-center'>
        <div className='text-center mx-auto text-4xl font-semibold mt-7'>
          Your swiss knife for
            <HighlightText text="learning any language"/>
        </div>
        <div className='text-center mx-auto w-[70%] text-lg '>
        Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
        </div>

        <div className='flex flex-row items-center justify-center'>
          <img src={Know_your_progress} alt='know_your_progress' className='object-fit -mr-32' />

          <img src={Compare_with_others} alt='know_your_progress' className='object-fit'/>

          <img src={Plan_your_lessons} alt='know_your_progress' className='object-fit -ml-32'/>
        </div>

        <div className='w-fit'>
          <CTABUTTON active={true} linkto={"/signup"}>
            <div>
              Learn More
            </div>
          </CTABUTTON>
        </div>
      </div>
    </div>
  )
}

export default LearnLanguageSection