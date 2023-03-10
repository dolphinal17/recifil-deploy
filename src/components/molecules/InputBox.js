import React from 'react'
import styles from '../../style'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const InputBox = ( { placeHolder, icon, type, name, value, onChange} ) => {
  return (
    <div className={`${styles.inputLS}`}>
        <input type={type} placeholder={placeHolder} name={name} value={value} onChange={onChange} className='bg-transparent border-none mx-1.5 outline-none max-w-[16rem] w-full text-sm font-light tablet:font-normal text-mainBlack'/>

        <div className={`w-14 h-14 bg-secondary rounded-md ${styles.flexCenter} ml-[1rem]`}>
            <FontAwesomeIcon icon={icon} className='text-primary' />
        </div>
    </div>
  )
}
