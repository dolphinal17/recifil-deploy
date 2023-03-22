import { getAuth, sendPasswordResetEmail } from 'firebase/auth'
import React, { useState } from 'react'
import { toast } from 'react-toastify'


export default function ForgotPasswordForm() {

  const [email, setEmail] = useState('')

  function onChange(e) {
    setEmail(e.target.value)
  }

  async function onSubmit (e) {
    e.preventDefault()
    try {
      const auth = getAuth()
      await sendPasswordResetEmail(auth, email)
      toast.success("Email was sent")
    } catch (error) {
      toast.error("Could not send Reset Password.")
    }
    
  }

  return (
    <form onSubmit={onSubmit} className='w-full max-w-[32rem] bg-primary rounded-lg shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)]'>
        {/* modal image */}
        <img src='https://firebasestorage.googleapis.com/v0/b/firestore-328db.appspot.com/o/webimages%2Flock.png?alt=media&token=9b61bfaf-1ddc-4ffa-91e2-06f3bcd1260b' className='w-full object-cover rounded-t-lg' />

        <div className='flex flex-col p-[1rem]'>
                {/* modal title */} 
                <div className='flex flex-col pb-[0.25rem] tablet:pb-[0.5rem] border-b border-zinc-200 gap-[0.25rem] tablet:gap-[0.5rem]'>
                    <span className='text-center text-base tablet:text-2xl font-normal text-mainBlack'>Forgot Password</span>

                    <p className='text-center text-sm font-thin tablet:font-light text-fadeBlack'>Enter email address associated with your account and we'll send you a link to reset your password.</p>
                </div>
                <span className='text-sm font-light tablet:font-normal text-mainBlack mt-[1rem] tablet:mt-[2rem]'>Email</span>

                <div className='flex items-center gap-[0.5rem] tablet:gap-[1rem] mt-[0.125rem] tablet:mt-[0.25rem]'>
                  <input type='email' value={email} id="email" onChange={onChange} className='text-sm font-light tablet:font-normal text-mainBlack border border-zinc-400 p-[0.5rem] outline-none rounded-sm w-full'></input>

                  <button type='submit' className='text-sm tablet:text-base font-normal text-primary bg-lime-600 py-[0.5rem] rounded-md px-[1.5rem]'>Submit</button>
                </div>
            </div>
    </form>
  )
}