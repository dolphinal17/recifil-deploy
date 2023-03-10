import React from 'react'
import styles from '../../style';
import Logo from '../../assets/recifil-logo.png'
import { LoginForm } from '../organisms/organisms.js'

const Login = () => {
  return (
    <div className={`min-h-screen w-full bg-bgColor ${styles.flexCenter} w-full flex-col`}>
      {/* logo */}
      <div className={`flex flex-col  items-center mb-3`}>
        <img src={Logo} className='w-[80px] mb-1' />
        <h1 className='font-bold text-2xl'>ReciFil</h1>
      </div>

      <LoginForm />
    </div>
  )
}

export default Login