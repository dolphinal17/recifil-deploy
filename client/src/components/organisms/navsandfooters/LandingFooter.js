import React from 'react'
import { faCopyright, } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const LandingFooter = () => {
  return (
    <footer className='w-full flex flex-col justify-start items-center bg-transparent border-none z-10 px-[1rem]'>
            <div className='w-full max-w-[64rem] border-t border-zinc-400 flex justify-between items-center py-[1rem]'>
                {/* <div className='flex justify-center'>
                    <hr className='w-full bg-fadeText h-[1px]'/>
                </div> */}  

                <span className='flex items-center gap-[0.5rem] text-base tablet:text-2xl font-medium tablet:font-semibold text-mainBlack'><img src="https://firebasestorage.googleapis.com/v0/b/recifil.appspot.com/o/webimages%2FLogoMainG.png?alt=media&token=c25b6fd5-4217-4b56-af19-4aa6208abcc8" alt='recifillogo' className='w-[2rem]'></img>ReciFil</span>

                <span className='text-base tablet:text-lg font-normal tablet:font-medium text-mainBlack'><FontAwesomeIcon icon={faCopyright} /> 2023 All Rights Reserved</span>  
            </div>
        </footer>
  )
}

export default LandingFooter