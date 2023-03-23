import React from 'react'
import styles from '../../style'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const InputBox = ( { placeHolder, icon, type, name, value, onChange, onPaste, onCopy} ) => {
  return (
    <div className={`${styles.inputLS}`}>
        <input type={type} placeholder={placeHolder} name={name} value={value} onChange={onChange} className='bg-transparent border-none mx-[1rem] outline-none w-full text-sm font-light tablet:font-normal text-mainBlack'/>
    </div>
  )
}
