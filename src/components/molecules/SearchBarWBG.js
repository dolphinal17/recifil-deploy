import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faFilter } from '@fortawesome/free-solid-svg-icons'

export default function SearchBarWBG({ placeHolder, bg }) {
  return (
    <div className={`py-[0.5rem] px-[1rem] max-w-[22rem] w-full bg-${bg} rounded-full flex flex-row justify-center items-center`}>
        <FontAwesomeIcon icon={faMagnifyingGlass} className='text-fadeText text-sm mr-[0.5rem]' />

        <input className='bg-transparent focus:outline-none text-sm w-full font-light tablet:font-normal' placeholder={placeHolder}></input>

        <FontAwesomeIcon icon={faFilter} className='text-textMainBlack text-sm ml-[0.5rem]'/>
    </div>
  )
}
