import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';

export default function NavbarAdmin() {
  return (
    <nav className='flex items-center w-full h-[4rem] px-[1rem] tablet:px-[1.5rem] bg-primary shadow-md'>
        <div className='flex w-full justify-end'>
            {/* profile */}
            <div className='flex gap-[0.5rem] tablet:gap-[1rem] items-center'>
                <div className='flex gap-[0.125rem] tablet:gap-[0.25rem] items-center'>
                    <img src="https://i.pinimg.com/564x/25/65/46/25654639ef43d6cd59e062bc2cec1a2c.jpg" className='w-[1.5rem] h-[1.5rem] rounded-full object-cover cursor-pointer'></img>

                    <span className='text-sm font-light tablet:font-normal text-mainBlack'>Admin</span>
                </div>

                <FontAwesomeIcon icon={faGear} className='text-sm text-fadeBlack'/>
            </div>
        </div>
    </nav>
  )
}