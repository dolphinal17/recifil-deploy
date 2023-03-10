import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark} from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'


const CardCreatePost = ( { open, onClose } ) => {
    if (!open) return null
  return (
    <div onClick={onClose} className='min-h-screen w-full flex justify-center py-5 fixed z-10 bg-textFadeBlack'>
        <div  onClick={(e) => {
            e.stopPropagation()
        }} className='sm:max-w-[440px] max-w-[340px] border-solid border-[1px] rounded-[5px] px-5 py-4 bg-[#FFFFFF] overflow-y-scroll scrollbar-none'>
            <div className='flex justify-between items-center'>
                <h1 className='text-[16px] font-[600] text-[#000000]'>Create new post</h1>
                <FontAwesomeIcon onClick={onClose} icon={faXmark} className='text-[16px] font-[500] text-[#949494]'/>
            </div>
            <div className='pt-[20px]'>
                <textarea typeof='text' placeholder='About recipe' className='p-[20px] sm:w-[400px] w-[300px] h-[150px] bg-[#F2F1F0] resize-none mb-[12px] focus:outline-none placeholder-[#949494] text-[16px] font-[500]'></textarea>
            </div>
            <div className='pb-2 flex justify-between items-center'>
                <input type="text" placeholder='Recipe name' className='placeholder-[#949494] text-[14px] font-[500] border-b border-[#949494] focus:outline-none '></input>
                <img src="https://cdn-icons-png.flaticon.com/512/685/685685.png" className='w-[57px] h-[57px]' />
            </div>
            <div className='sm:w-[60%] w-[80%] mt-[15px]'>
                <h1 className='text-[14px] font-[500] text-[#000000] mb-[10px]'>Ingredients:</h1>
                <div className='flex flex-row items-center mb-[10px]'>
                    <div className='w-[11px] h-[11px] bg-[#B2D33D] rounded-[50%] mr-[5px]'></div>
                    <h2 className='text-[14px] font-[500] mr-[10px]'>Chicken</h2>
                    <div className='w-[11px] h-[11px] bg-[#B2D33D] rounded-[50%] mr-[5px]'></div>
                    <h2 className='text-[14px] font-[500] mr-[10px]'>Potato</h2>
                    <div className='w-[11px] h-[11px] bg-[#B2D33D] rounded-[50%] mr-[5px]'></div>
                    <h2 className='text-[14px] font-[500] mr-[10px]'>Carrots</h2>
                </div>
                <div className='pb-2'>
                    <input type="text" placeholder='Add ingredients' className='placeholder-[#949494] text-[14px] font-[500] border-b border-[#949494] focus:outline-none mb-[15px]'></input>
                </div>
            </div>
            <div className='w-[100%]'>
                <h1 className='text-[14px] font-[500] text-[#000000] mb-[7px]'>Procedure:</h1>
                <h2 className='text-[14px] font-[500] text-[#949494] mb-[10px]'>1. Combine chicken, garlic, peppercorn, vinegar, Oyster Sauce, soy sauce and water in a pot. Simmer for 15 minutes.</h2>
                
                <div className='pb-2'>
                    <input type="text" placeholder='Add procedure' className='placeholder-[#949494] text-[14px] font-[500] border-b border-[#949494] focus:outline-none mb-[15px]'></input>
                </div>
                <div className='flex justify-center'>
                <button className='sm:w-[400px] w-[290px] h-[54px] bg-[#B2D33D] rounded-[5px] text-[16px] font-[500] text-[#fff]'>Post</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CardCreatePost