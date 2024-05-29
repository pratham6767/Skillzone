import React from 'react'
import { Link } from 'react-router-dom'
const Button = ({children,active,Linkto}) => {
  return (
    <Link to={Linkto}>
    <div className={`text-center text-[13px] px-6 py-3 rounded-md drop-shadow-[1.5px_1.5px_rgba(255,255,255,0.25)] font-bold ${active ?"bg-yellow-50 text-black":"bg-richblack-800"} transition-all duration-200 hover:scale-95`}> 
        {children}
    </div>
    </Link>
  )
}

export default Button