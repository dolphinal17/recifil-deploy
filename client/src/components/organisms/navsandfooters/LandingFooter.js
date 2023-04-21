import React from 'react'
import { faCopyright, } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faGithub } from '@fortawesome/free-brands-svg-icons'

const LandingFooter = () => {
  return (
    <footer className='w-full flex flex-col justify-start items-center bg-primary py-[0.5rem] laptop:py-[1rem]'>
        <div className='w-full max-w-[64rem]'>
            {/* <div className='flex justify-center'>
                <hr className='w-full bg-fadeText h-[1px]'/>
            </div> */}

            <div className='w-full laptop:flex laptop:justify-between items-center'>
                <div className='w-full flex flex-col laptop:flex-row items-center justify-center gap-[1rem] laptop:gap-[4rem]'>
                    <div className='flex flex-col sm:flex-row items-center gap-[1rem] text-center'>
                        <span className='flex items-center gap-[0.25rem] text-sm tablet:text-base font-normal tablet:font-medium text-mainBlack'><img src="https://firebasestorage.googleapis.com/v0/b/firestore-328db.appspot.com/o/webimages%2FNewLogoSecondary.png?alt=media&token=0c0d1f96-61bb-405a-99b1-9e8a51974677" alt='recifillogo' className='w-[1rem]'></img>Recifil</span>

                        <span className='text-sm tablet:text-base font-normal tablet:font-medium text-mainBlack'><FontAwesomeIcon icon={faCopyright} /> 2023 All Rights Reserved | 4B BSCS | University of Caloocan City</span>
                    </div>

                    <div className='flex laptop:justify-between justify-center gap-1'>
                    <h1 className='text-textMainBlack text-sm tablet:text-base'>Follow us on</h1>

                        <ul className='flex gap-2'>
                            <li><FontAwesomeIcon icon={faFacebookF} className='text-[1rem] text-secondary'/></li>
                            <li><FontAwesomeIcon icon={faTwitter} className='text-[1rem] text-secondary'/></li>
                            <li><FontAwesomeIcon icon={faGithub} className='text-[1rem] text-secondary'/></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </footer>
  )
}

export default LandingFooter