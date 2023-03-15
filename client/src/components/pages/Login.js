import React from 'react'
import styles from '../../style';
import { LoginForm } from '../organisms/organisms.js'

const Login = () => {
  return (
    <div className={`min-h-screen w-full bg-bgColor ${styles.flexCenter} w-full flex-col`}>
      {/* logo */}
      <div className={`flex flex-col  items-center mb-3`}>
        <img src="https://firebasestorage.googleapis.com/v0/b/firestore-328db.appspot.com/o/webimages%2FNewLogoSecondary.png?alt=media&token=0c0d1f96-61bb-405a-99b1-9e8a51974677" alt='ReciFil' className='w-[3rem] mb-1' />
        <h1 className='font-bold text-2xl'>ReciFil</h1>
      </div>

      <LoginForm />
    </div>
  )
}

export default Login