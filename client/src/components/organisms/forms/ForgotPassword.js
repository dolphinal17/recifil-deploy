import React from 'react'


export default function ForgotPassword() {
  return (
    <div className='bg-bgColor w-full h-screen flex justify-center items-center'>
        <form className='w-full max-w-[32rem] bg-primary p-[2rem] flex flex-col'>
            <div className='flex items-center gap-[0.5rem] tablet:gap-[1rem] mb-[2rem] tablet:mb-[4rem]'>
                <img src="https://firebasestorage.googleapis.com/v0/b/firestore-328db.appspot.com/o/webimages%2FNewLogoSecondary.png?alt=media&token=0c0d1f96-61bb-405a-99b1-9e8a51974677" alt='recifillogo' className='w-[1rem] tablet:w-[2rem]'></img>

                <span className='text-base tablet:text-2xl font-normal tablet:font-medium text-mainBlack'>ReciFil</span>
            </div>

            <p className='text-sm font-light tablet:font-normal text-mainBlack'>Enter email address associated with your account and we'll send you a link to reset your password.</p>

            <div className='flex flex-col gap-[0.25rem] tablet:[0.5rem] mt-[1rem] tablet:mt-[2rem]'>
                <span className='text-sm font-light tablet:font-normal text-mainBlack'>Email</span>

                <input type='email' className='text-sm font-light tablet:font-normal text-mainBlack border-2 border-fadeBlack p-[0.5rem] outline-none rounded-sm'></input>
            </div>

            <button className='flex justify-center items-center py-[0.5rem] bg-secondary text-sm font-light tablet:font-normal text-primary mt-[0.5rem] tablet:mt-[1rem] rounded-sm'>Send Code</button>
        </form>
    </div>
  )
}