import React from 'react'
import { faAt, faUser, faLock } from '@fortawesome/free-solid-svg-icons'
import { BtnLS } from '../atoms/atoms.js'
import { InputBox } from '../molecules/molecules.js'

export default function SignUpForm() {
  return (
    <form className='w-full max-w-[28rem] px-[1rem] py-[2rem] tablet:px-[3rem] tablet:py-[2rem] bg-primary rounded-3xl'>
        <h1 className='text-secondary text-base font-medium text-center mb-[2rem]'>CREATE ACCOUNT</h1>

        {/* inputs */}
        <div className='flex flex-col gap-[1rem]'>
            {/* firstname */}
            <InputBox
                type="text" 
                icon={faUser}
                placeHolder="Enter your firstname"
            />

            {/* lastname */}
            <InputBox
                type="text" 
                icon={faUser}
                placeHolder="Enter your lastname"
            />

            {/* username */}
            <InputBox
                type="text" 
                icon={faUser}
                placeHolder="Enter your username"
            />

            {/* email */}
            <InputBox
                type="text" 
                icon={faAt}
                placeHolder="Enter your email"
            />

            {/* password */}
            <InputBox
                type="password" 
                icon={faLock}
                placeHolder="Enter your password"
            />

            {/* confirm password */}
            <InputBox
                type="password" 
                icon={faLock}
                placeHolder="Confirm your password"
            />
        </div>
 
        {/* button Create and Login link*/}
        <div className='flex items-center flex-col gap-[1rem] mt-[2rem]'>
            <BtnLS 
                val="Create"
            />

            <h3 className='text-xs'>Already have an account?<span className='ml-1 text-secondary cursor-pointer'>login here</span></h3>
        </div>
    </form>
  )
}
