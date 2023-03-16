import React from 'react'
import styles from '../../style';
import { SignUpForm } from '../organisms/organisms.js'

const Signup = () => {
  return (
    <div className={`min-h-screen bg-bgColor ${styles.flexCenter} py-[1rem]`}>
        <SignUpForm />
    </div>
  )
}

export default Signup