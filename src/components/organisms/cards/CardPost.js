import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faComment } from '@fortawesome/free-regular-svg-icons'
import { faTag } from '@fortawesome/free-solid-svg-icons'

export default function CardPost( {usersName, about, recipeName, usersImage, recipeImage} ) {
  return (
    <div className='w-full max-w-[47.5rem] min-h-[15.875rem] grid sm:grid-cols-3 shadow-[0_3px_10px_rgb(0,0,0,0.2)]'>
        <div className='col-span-1 w-full h-[15.875rem] bg-textFadeBlack'>
            <img src={recipeImage} className='w-full h-full object-cover'></img>
        </div>

        <div className='col-span-1 sm:col-span-2 w-full p-[1rem]'>
            <div className='flex flex-col gap-[1rem] relative'>
                {/* user profile and icon */}
                <div className='flex justify-between items-center w-full'>
                    {/* user's profile */}
                    <div className='flex items-center gap-[0.5rem]'>
                        <div className='w-[3rem] h-[3rem] rounded-full'>
                            <img src={usersImage} className='w-full h-full object-cover rounded-full'></img>
                        </div>

                        <label className='text-sm font-medium text-textMainBlack'>{usersName}</label>
                    </div>

                    {/* icon */}
                    <FontAwesomeIcon icon={faHeart} className='text-secondary text-[2rem]' />
                </div>

                {/* about recipe and recipe name */}
                <div className='flex flex-col gap-[0.5rem]'>
                    <label className='text-sm font-normal text-textMainBlack'>{about}</label>

                    <div className='flex gap-[0.5rem] items-center'>
                        <FontAwesomeIcon icon={faTag} className='text-secondary text-[0.75rem]'/>

                        <label className='text-sm font-normal text-textMainBlack'>{recipeName}</label>
                    </div>
                </div>

                {/* Ingredients */}
                <div className='flex flex-col gap-[0.5rem]'>
                    <label className='text-sm font-medium text-textFadeBlack'>Ingredients</label>

                    <ul className='flex flex-col gap-[0.25rem]'>
                        <li className='text-sm font-normal text-textMainBlack'>Pork</li>
                        <li className='text-sm font-normal text-textMainBlack'>Eggplant</li>
                        <li className='text-sm font-normal text-textMainBlack'>Petchay...<span className='font-sm text-normal text-secondary'> view all</span></li>
                    </ul>
                </div>  

                {/* comments */}
                <button className='p-[0.375rem] flex items-center text-sm font-normal text-textFadeBlack absolute bottom-0 right-0 border-solid border-2 border-[#EDEDED] rounded-md'><FontAwesomeIcon icon={faComment} className='text-secondary text-sm mr-[0.25rem]'/>3 comments</button>    
            </div>
        </div>
    </div>
  )
}
