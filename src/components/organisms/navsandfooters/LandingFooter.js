import React from 'react'
import { faCopyright, } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faFacebookF, faTwitter, faGithub } from '@fortawesome/free-brands-svg-icons'

const LandingFooter = () => {
  return (
    <footer className='w-full flex flex-col justify-start items-center bg-primary pt-[1rem] laptop:pt-[2rem]'>
        <div className='w-full max-w-[64rem]'>
            <div className='flex justify-center'>
                <hr className='w-full bg-fadeText h-[1px]'/>
            </div>

            <div className='w-full laptop:flex laptop:justify-between items-center my-[1rem]'>
                <div className='w-full flex flex-col laptop:flex-row items-center justify-center gap-[1rem] laptop:gap-[4rem]'>
                    <h1 className='text-center sm:text-[1rem] text-[12px] font-[600] text-textMainBlack'><span className='text-secondary'>ReciFil</span> | <FontAwesomeIcon icon={faCopyright} /> 2023 All Rights Reserved | 4B BSCS | University of Caloocan City</h1>

                    <div className='flex laptop:justify-between justify-center gap-1'>
                        <h1 className='text-textMainBlack text-[1rem] '>Follow us on</h1>

                        <ul className='flex gap-2'>
                            <li><FontAwesomeIcon icon={faCopyright} className='text-[1rem] text-secondary'/></li>
                            <li><FontAwesomeIcon icon={faCopyright} className='text-[1rem] text-secondary'/></li>
                            <li><FontAwesomeIcon icon={faCopyright} className='text-[1rem] text-secondary'/></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </footer>
  )
}

export default LandingFooter