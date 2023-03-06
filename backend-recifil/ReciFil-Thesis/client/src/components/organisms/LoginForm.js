import React from 'react'
import { BtnLS } from '../atoms/atoms.js'
import { InputBox } from '../molecules/molecules.js'
import { faAt, faLock } from '@fortawesome/free-solid-svg-icons'

export default function LoginForm() {
  return (
    <form className='w-full max-w-[28rem] px-[1rem] py-[2rem] tablet:px-[3rem] tablet:py-[4rem] bg-primary rounded-3xl'>
        <h1 className='text-secondary text-base font-medium text-center mb-[2rem]'>LOGIN TO CONTINUE</h1>

        {/* inputs */}
        <div className='flex flex-col gap-[1rem]'>
            {/* email */}
            <InputBox 
                type="text"
                icon={faAt}
                placeHolder="Enter your email or username"
            />

            {/* password */}
            <InputBox
                type="password" 
                icon={faLock}
                placeHolder="Password"
            />
        </div>

        {/* remember me and forgot password line */}
        <div className='flex flex-row justify-between items-center w-full mt-[1rem] mb-[2rem]'>
            <div className='flex flex-row'>
                <input type="checkbox" className=''/>
                <h5 className='text-secondary text-xs ml-1'>Remember me</h5>
            </div>

            <h5 className='text-secondary text-xs cursor-pointer'>forgot your password?</h5>
        </div>
        
        {/* button login and sign-up link*/}
        <div className='flex items-center flex-col gap-[1rem]'>
            <BtnLS 
                val="Login"
            />

            <h3 className='text-xs'>Don't have an account?<span className='ml-1 text-secondary cursor-pointer'>click here</span></h3>
        </div>
    </form>
  )
}
