import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'

function SearchBarWBG() {
  return (
    <div className='max-w-[22.5rem] w-[15rem] tablet:w-full p-[0.5rem] rounded-full bg-primary flex flex-row justify-center items-center'>
        <FontAwesomeIcon icon={faMagnifyingGlass} className='text-fadeText text-sm mr-[10px]' />
        <input type="text" placeholder='Search people' className='bg-transparent focus:outline-none text-sm w-full'/>
    </div>
  )
}

export default SearchBarWBG