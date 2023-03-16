import React from 'react'
import { EmailVerificationModal } from '../molecules/molecules.js'

export default function EmailVerification() {
  return (
    <div className='w-full h-screen flex justify-center items-center bg-primary px-[1rem] sm:px-0'>
        <EmailVerificationModal/>
    </div>
  )
}