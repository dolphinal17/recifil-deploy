import React from 'react'

export default function BtnServing( {val} ) {
  return (
    <button className='py-[0.25rem] px-[0.24rem] max-w-[6rem] flex justify-center items-center border-solid border-2 border-[#EDEDED] font-thin laptop:font-light text-fadeBlack text-[0.75rem] rounded-sm'>{val}</button>
  )
}
