import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment } from '@fortawesome/free-regular-svg-icons'

function BtnCommSocials() {
  return (
    <button className='px-[1rem] py-[0.5rem] text-sm font-normal bg-transparent rounded-md text-fadeText border-solid border-2 border-[#EDEDED]'><FontAwesomeIcon icon={faComment} className='text-fadeText text-base mr-2' /><span>3 </span>Comments</button>
  )
}

export default BtnCommSocials