import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
export default function PreLoader() {
  return (
    <div className='h-screen w-full flex justify-center items-center bg-primary relative'>
        {/* <FontAwesomeIcon icon={faSpinner} className='w-[3rem] h-[3rem] animate-spin text-fadeBlack' /> */}
        <div className="w-[1rem] h-[1rem] laptop:w-[3rem] laptop:h-[3rem] absolute rounded-full border-2 border-dashed border-gray-200"></div>
        <div className="w-[1rem] h-[1rem] laptop:w-[3rem] laptop:h-[3rem] rounded-full animate-spin absolute border-2 border-dashed border-green-500 border-t-transparent"></div>
    </div>   
  )
}
