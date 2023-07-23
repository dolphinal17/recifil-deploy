import React from 'react'

import { Link } from 'react-router-dom'

const LandingNavbar = () => {
  return (
    <nav className='w-full z-10 absolute top-0'>
        <div className='max-w-[82rem] px-4 tablet:px-8 flex justify-between m-auto items-center py-5 z-10'>
            <div className='flex items-center gap-[0.5rem] tablet:gap-[1rem]'>
                <img src="https://firebasestorage.googleapis.com/v0/b/recifil.appspot.com/o/webimages%2FLogoMainG.png?alt=media&token=c25b6fd5-4217-4b56-af19-4aa6208abcc8" alt='recifillogo' className={`w-[1.5rem] laptop:w-[2rem]`}/>

                <h1 className='text-xl tablet:text-3xl text-white font-bold'>ReciFil</h1>
            </div>

            <div className='flex item-center gap-2'>
                <Link to='/login'><button className={`text-white text-sm tablet:text-base font-normal hover:text-secondary`}>Login</button></Link>

                {/* <Link to='/signup'><button className='sm:w-[9rem] w-[4rem] sm:h-[3rem] h-[2rem] bg-primary rounded-[10px] border border-zinc-200   text-secondary sm:text-[18px] text-[15px] font-[400] hover:border-zinc-400'>Sign Up</button></Link> */}
            </div>
        </div>
    </nav>
  )
}

export default LandingNavbar

