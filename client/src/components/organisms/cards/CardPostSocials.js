import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-regular-svg-icons'
import { BtnCommSocials } from '../../atoms/atoms.js'

function CardPostSocials() {
  return (
    <div className='w-full grid laptop:grid-cols-3 min-h-[22rem] shadow-md'>
        {/* image */}
        <img src="https://images.aws.nestle.recipes/resized/af78558684736b541f41416b652b5eed_MMS_K_0102_1900px_944_531.jpg" alt="" className='col-span-1 h-full object-cover'/>

        {/* side content */}
        <div className='col-span-1 laptop:col-span-2 bg-primary flex flex-col p-4'>
            {/* profile and heart button */}
            <div className='w-full flex justify-between items-center'>
            {/* profile */}
            <div className='flex justify-between items-center gap-4'>
                <div className='w-[3rem] h-[3rem] rounded-full bg-fadeText'><img src="https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" className='w-[100%] h-full object-cover rounded-full'/></div>

                <h1 className='text-sm font-medium'>Jhon Rhendel Narvaez</h1>
            </div>

            {/* heart */}
            <FontAwesomeIcon icon={faHeart} className='text-secondary text-4xl' />
            </div>

            {/* Recipe about, name, ingredients */}
            <div className='w-full mt-4 flex flex-col gap-2'>
            {/* recipe about */}
            <p className='text-sm font-normal'>Hello! This is my new and own recipe for my favorite food</p>

            {/* recipe name */}
            <p className='text-sm font-normal text-secondary'>Pork Kare-Kare</p>

            {/* ingredients */}
            <div>
                <p className='text-sm font-normal text-fadeText mb-1'>Ingredients</p>

                <ul className='flex flex-col gap-1 ml-1'>
                <li className='text-sm font-normal'>Pork</li>
                <li className='text-sm font-normal'>Eggplant</li>
                <li className='text-sm font-normal'>Beans</li>
                <li className='text-sm font-normal'>Ingredient</li>
                <li className='text-sm font-normal'>Ingredient...</li>
                </ul>
            </div>

            {/* see more and comment */}
            <div className='w-full flex justify-between items-center'>
                <p className='text-sm font-normal text-secondary cursor-pointer underline'>see more</p>

                <BtnCommSocials />
            </div>
            </div>
        </div>
    </div>
  )
}

export default CardPostSocials