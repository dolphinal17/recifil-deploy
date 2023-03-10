import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
const Comment = () => {
  return (
    <div className='max-w-[22rem] w-full bg-primary'>
      {/* comments */}
      <div className='flex flex-col px-[1rem] pt-[1rem] gap-[0.75rem]'>
        {/* comment text and close btn */}
        <div className='flex justify-between items-center'>
          <span className='text-sm font-normal laptop:font-medium text-mainBlack'>Comments</span>

          <FontAwesomeIcon icon={faXmark} className='text-sm text-fadeBlack'/>
        </div>
        
        {/* comments */}
        <div className='flex flex-col gap-[0.5rem]'> 
          <div className='flex justify-start items-start gap-[0.5rem]'>
            <img src="https://i.pinimg.com/564x/25/65/46/25654639ef43d6cd59e062bc2cec1a2c.jpg" className='w-[2rem] h-[2rem] rounded-full object-cover'/>

            <div className='w-full flex flex-col p-[0.5rem] rounded-sm bg-bgColor gap-[0.25rem]'>
              <span className='text-sm font-light laptop:font-normal text-mainBlack'>Sample Name</span>

              <span className='text-sm font-thin laptop:font-light text-mainBlack'>This is my comment!</span>
            </div>
          </div>
        </div>
      </div>

      {/* divider */}
      <hr className='w-full bg-[#D0D0D0] h-[1px]'/>

      {/* users input */}
      <div className='flex items-center gap-[0.5rem] px-[1rem] py-[0.5rem]'>
        <img src="https://i.pinimg.com/564x/25/65/46/25654639ef43d6cd59e062bc2cec1a2c.jpg" className='w-[3rem] h-[3rem] rounded-full object-cover'/>

        <input placeholder='Add a comment' className='text-sm font-light laptop:font-normal text-mainBlack outline-none'></input>
      </div>
    </div>
  )
}

export default Comment