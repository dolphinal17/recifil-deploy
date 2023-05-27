import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';

export default function ModalApprovePost({onOpen, onClose, onClick}) {
    if (!onOpen) return null 
    return (
      <div className='bg-textFadeBlack fixed inset-0 z-50'>
            <div className='flex h-screen justify-center items-center'>
                <div className='p-[2rem] flex flex-col gap-[1rem] tablet:gap-[2rem] bg-primary rounded-lg'>
                    <FontAwesomeIcon icon={faCircleExclamation} className='text-5xl text-lime-600' />

                    <span className='text-base tablet:text-xl font-light tablet:font-normal text-mainBlack'>Are you sure, you want to approve this post?</span>

                    <div className='flex justify-center items-center gap-[0.5rem] tablet:gap-[1rem]'>
                        <button onClick={onClose} className='flex justify-center items-center px-[1rem] tablet:px-[2rem] py-[0.5rem] tablet:py-[1rem] text-base font-thin tablet:font-light text-mainBlack bg-zinc-200 hover:bg-zinc-400 hover:text-primary rounded-md'>Cancel</button>

                        <button 
                        onClick={onClick}
                            className='flex justify-center items-center px-[1rem] tablet:px-[2rem] py-[0.5rem] tablet:py-[1rem] text-base font-light tablet:font-normal text-primary bg-lime-600 hover:bg-lime-700 rounded-md
                            '>Approve
                        </button>
                    </div>
                </div>
            </div>
      </div>
    )
}
