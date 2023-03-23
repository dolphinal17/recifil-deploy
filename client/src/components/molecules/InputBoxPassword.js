import React, {useState} from 'react'
import styles from '../../style'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faEye, faEyeSlash} from '@fortawesome/free-regular-svg-icons'

export default function InputBoxPassword({ placeHolder, icon, type, name, value, onChange }) {
    const [isPasswordHidden, setIsPasswordHidden] = useState(true)
    const [isIconHidden, setIsIconHidden] = useState(true)
    const [passwordType, setPasswordType] = useState("password");

    const togglePassword =()=>{
        if(passwordType==="password")
        {
         setPasswordType("text")
         return;
        }
        setPasswordType("password")
      }

  return (
    <div className={`${styles.inputLS}`}>
        <input type={passwordType} placeholder={placeHolder} name={name} value={value} onChange={onChange} className='bg-transparent border-none mx-[1rem] outline-none w-full text-sm font-light tablet:font-normal text-mainBlack'/>

        <FontAwesomeIcon  onClick={() => {
            setIsPasswordHidden(!isPasswordHidden);
            togglePassword();
        }} icon={isPasswordHidden ? faEye : faEyeSlash } className='text-sm text-fadeBlack pr-[1rem] cursor-pointer'/>
    </div>
  )
}