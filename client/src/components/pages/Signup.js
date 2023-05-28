import React from 'react'
import styles from '../../style';
import { SignUpForm } from '../organisms/organisms.js'

const Signup = () => {
  return (
    <div className={`min-h-screen bg-bgColor ${styles.flexCenter} py-[1rem] w-full flex-col`}>
      <div className='flex flex-col items-center mb-3'>
      <img src="https://firebasestorage.googleapis.com/v0/b/recifil.appspot.com/o/webimages%2FLogoMainG.png?alt=media&token=c25b6fd5-4217-4b56-af19-4aa6208abcc8" alt='ReciFil' className='w-[3rem] mb-1' />
        <h1 className='text-mainBlack font-bold text-2xl'>ReciFil</h1>
      </div>
        <SignUpForm />
    </div>
  )
}

export default Signup