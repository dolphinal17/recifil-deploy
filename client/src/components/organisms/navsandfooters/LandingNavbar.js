import React from 'react'

import { Link } from 'react-router-dom'

const LandingNavbar = () => {
  return (
    <nav className='w-full bg-primary'>
        <div className='desktop:w-[67rem] laptop:w-[60rem] sm:w-[38rem] w-[20rem] h-auto flex justify-between m-auto items-center py-3'>
            <div className='flex items-center gap-[0.5rem]'>
                <img src="https://firebasestorage.googleapis.com/v0/b/firestore-328db.appspot.com/o/webimages%2FNewLogoSecondary.png?alt=media&token=0c0d1f96-61bb-405a-99b1-9e8a51974677" alt='recifillogo' className='w-[1rem] laptop:w-[2rem]'/>

                <h1 className='sm:text-2xl text-xl text-textMainBlack font-semibold'>ReciFil</h1>
            </div>

            <div className='flex item-center gap-2'>
                <Link to='/login'><button className='sm:w-[9rem] w-[4rem] sm:h-[3rem] h-[2rem] bg-secondary rounded-[10px] text-[#FFFFFF] sm:text-[18px] text-[15px] font-[400] '>Login</button></Link>

                <Link to='/signup'><button className='sm:w-[9rem] w-[4rem] sm:h-[3rem] h-[2rem] bg-primary rounded-[10px] border border-[#EDEDED] text-secondary sm:text-[18px] text-[15px] font-[400] '>Sign Up</button></Link>
            </div>
        </div>
    </nav>
  )
}

export default LandingNavbar

