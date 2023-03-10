import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom'

const ProfileMenu = () => {
  return (
    <div className='w-full max-w-[18.75rem] flex flex-col bg-primary rounded-sm shadow-lg'>
        {/* profile */}
        <div className='flex gap-[0.5rem] p-[0.5rem] items-center'>
            <img src='https://i.pinimg.com/564x/25/65/46/25654639ef43d6cd59e062bc2cec1a2c.jpg' className='w-[3rem] h-[3rem] object-cover rounded-full'></img>

            {/* name and arrow*/}
            <Link to='/profile'><div className='w-full flex justify-between items-center cursor-pointer'>
                <div className='flex flex-col gap-[0.125rem]'>
                    <span className='text-sm tablet:text-base font-normal laptop:font-medium text-mainBlack'>Sample Name</span>

                    <span className='text-xs tablet:text-sm font-light laptop:font-normal text-fadeBlack'>My Profile</span>
                </div>

                <FontAwesomeIcon icon={faChevronRight} className='text-base laptop:text-2xl text-secondary'/>
            </div></Link>
        </div>

        <hr className='w-full bg-[#D0D0D0] h-[1px]'/>

        <div className='flex p-[0.5rem] items-center justify-end gap-[0.25rem] laptop:gap-[0.5rem] cursor-pointer'>
            <FontAwesomeIcon icon={faArrowRightFromBracket} className='text-sm text-secondary'/>

            <span className='text-sm font-normal laptop:font-medium text-secondary'>Logout</span>
        </div>
    </div>
  )
}

export default ProfileMenu

