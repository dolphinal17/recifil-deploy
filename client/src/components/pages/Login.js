import React from 'react'
import styles from '../../style';
import { LoginForm } from '../organisms/organisms.js'

const Login = () => {
  return (
    <div className={`min-h-screen w-full bg-zinc-200 ${styles.flexCenter} w-full flex-col`}>
      {/* logo */}
      <div className={`flex flex-col  items-center mb-3`}>
        <img src="https://firebasestorage.googleapis.com/v0/b/recifil.appspot.com/o/webimages%2FLogoMainG.png?alt=media&token=c25b6fd5-4217-4b56-af19-4aa6208abcc8" alt='ReciFil' className='w-[3rem] mb-1' />
        <h1 className='text-mainBlack font-bold text-2xl'>ReciFil</h1>
      </div>

      <LoginForm />
    </div>
  )
}

export default Login