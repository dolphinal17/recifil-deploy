import React from 'react'
import { faCopyright, } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const LandingFooter = () => {
  return (
    <footer className='bg-primary w-full flex flex-col justify-start items-center border-none z-10 px-[1rem] pt-6'>
        <div className='w-full max-w-[64rem] flex flex-col py-[1rem]'>
            {/* <div className='flex justify-center'>
                <hr className='w-full bg-fadeText h-[1px]'/>
            </div> */}  

            {/* <hr className='w-full bg-zinc-400 h-[2px] mt-[1rem] mb-[2rem]'/> */}

            <div className='grid tablet:grid-cols-3 gap-4 tablet:gap-8 justify-items-center'>
              <div className='w-full text-center'>
                <p className='text-mainBlack text-base tablet:text-lg font-medium'>Where to find us?</p>

                <p className='text-mainBlack text-sm tablet:text-base font-normal mt-2 tablet:mt-4'>Q23J+R9M, Barangay 171 Congressional Rd Ext Caloocan, Metro Manila</p>
              </div>
              <div className='w-full text-center'>
                <p className='text-mainBlack text-base tablet:text-lg font-medium'>Our Contact</p>

                <p className='text-mainBlack text-sm tablet:text-base font-normal mt-2 tablet:mt-4'>recifil@gmail.com</p>
              </div>
              <div className='w-full text-center'>
                <p className='text-mainBlack text-base tablet:text-lg font-medium'>Follow</p>

                <p className='text-mainBlack text-sm tablet:text-base font-normal mt-2 tablet:mt-4'>Facebook</p>
                <p className='text-mainBlack text-sm tablet:text-base font-normal mt-1 tablet:mt-2'>Twitter</p>
                <p className='text-mainBlack text-sm tablet:text-base font-normal mt-1 tablet:mt-2'>Instagram</p>
              </div>
            </div>


            <div className='flex flex-col tablet:flex-row gap-4 tablet:gap-0 tablet:justify-between items-center mt-[4rem]'>
              <span className='text-sm font-normal text-mainBlack'><FontAwesomeIcon icon={faCopyright} /> ReciFil2023 All rights reserved</span>

              <div className='flex gap-4 items-center'>
                <span className='text-sm font-normal text-mainBlack'>Help & Support</span>
                <span className='text-sm font-normal text-mainBlack'>Terms & Conditions</span>
                <span className='text-sm font-normal text-mainBlack'>Privacy Policy</span>
              </div>
            </div>  
        </div>
    </footer>
  )
}

export default LandingFooter