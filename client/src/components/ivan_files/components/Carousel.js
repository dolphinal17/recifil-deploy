import React from 'react';
import cadobo from '../assets/c-adobo.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

const Carousel = () => {
  return (
    <div className='h-[25rem] w-[75rem] mx-auto'>

        <div className='flex justify-between flex-row items-center px-[1.5rem]'>
            <h1 className='text-[20px] text-[#B2D33D]'>Famous Filipino Recipes</h1>
            <h2 className='text-[20px] text-[#B2D33D]'>view all</h2>
        </div>

        <div className='mx-[1.5rem] flex flex-row justify-between mt-5'>

            <div className='w-[13rem] rounded-md'>
                <img src={cadobo} className='w-[13rem] h-[10rem] object-cover rounded-t-lg' />
                <div className='flex flex-row justify-between items-center bg-white relative bottom-[1rem] p-[0.25rem] px-2 rounded-b-lg shadow-xl border-black'>
                  <div>
                    <h5 className='text-[1rem] font-[600]'>Chicken Adobo</h5>
                    <p className='text-[0.75rem] font-[500]'>for 3 servings</p>
                  </div>
                  <FontAwesomeIcon icon={faHeart} className='text-[1rem] text-[#B2D33D]' />
                </div>
            </div>

            

        </div>

    </div>
  )
}

export default Carousel