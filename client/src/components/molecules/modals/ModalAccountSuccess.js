import React from 'react'
import { Link } from 'react-router-dom'


export default function ModalAccountSuccess() {
  return (
    //pop up ui -- w-full h-screen flex justify-center items-center bg-primary  px-[1rem] sm:px-0 bg-textFadeBlack fixed --

    // page
    <div className='w-full h-screen flex justify-center items-center bg-primary  px-[1rem] sm:px-0'>
        <div className='max-w-[32rem] w-full bg-primary rounded-lg shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)]'>
            <div className='flex justify-center'>
                <img src='https://firebasestorage.googleapis.com/v0/b/firestore-328db.appspot.com/o/webimages%2FCheckmark.png?alt=media&token=32e2737d-44e2-4e3d-b532-da52a7071829' className='w-[12rem]'/>
            </div>

            <div className='flex flex-col px-[1rem] gap-[1rem] tablet:gap-[2rem]'>
                <div className='flex flex-col gap-[0.5rem] tablet:gap-[1rem]'>
                    <span className='text-center text-base tablet:text-2xl font-normal tablet:font-medium text-mainBlack'>Congratulations!</span>

                    <span className='text-center text-base tablet:text-xl font-light tablet:font-normal text-mainBlack'>Account Created Successfully!</span>
                </div>

                <Link to='/upload'><button className='text-sm tablet:text-base font-normal text-primary bg-lime-500 py-[0.75rem] rounded-md px-[1.5rem] mx-auto mt-[0.5rem] tablet:mt-[1rem] mb-[1rem] tablet:mb-[2rem]'>Okay</button></Link>
            </div>
        </div>
    </div>
  )
}