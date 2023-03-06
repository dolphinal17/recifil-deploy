import React from 'react';
import Discoimg from '../assets/mainimg.jpg';

const Discimg = () => {
  return (
    <div className='w-full h-[400px]'>
        <div className='w-[85%] md:h-[320px] sm:h-[260px] h-[200px] mx-auto mt-10 rounded-xl relative' style={{
            background:
            `linear-gradient(180deg, rgba(255, 255, 255, 0.5) -52.88%, rgba(0, 0, 0, 0.5) 85.34%), url(${Discoimg})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover', 
             }}>
            <h1 className='absolute bottom-2 left-5 md:text-[50px] sm:text-[40px] text-[30px] font-[700] text-white'>Explore Different<br />Filipino Recipes</h1>
        </div>
    </div>
  )
}

export default Discimg