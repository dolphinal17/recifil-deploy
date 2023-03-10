import React from 'react';
import Discoimg from '../../../assets/mainimg.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const DiscImgWText = () => {
  return (
    <div className='w-full px-[1rem] laptop:px-0'>
        <div className='max-w-[68rem] laptop:h-[20rem] tablet:h-[16.25rem] h-[12.5rem] mx-auto rounded-xl relative mb-[1rem]' style={{
            background:
            `linear-gradient(180deg, rgba(255, 255, 255, 0.5) -52.88%, rgba(0, 0, 0, 0.5) 85.34%), url(${Discoimg})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover', 
             }}>

            <h1 className='absolute bottom-2 left-5 laptop:text-[3rem] tablet:text-[2rem] text-[1.5rem] font-semibold laptop:font-bold text-white'>Explore Different<br />Filipino Recipes</h1>

            <FontAwesomeIcon icon={faMagnifyingGlass} className='absolute top-5 left-5  text-base tablet:text-xl laptop:text-2xl text-primary'/>
        </div>
    </div>
  )
}

export default DiscImgWText