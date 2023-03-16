import React from 'react'
import styles from '../../style.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

const FiltInIngBasket = ( {name} ) => {
  return (
    <div className={`px-[0.75rem] py-[0.5rem] bg-secondary rounded-md ${styles.flexCenter} mb-[10px] mr-[4px]`}>
        <p className='text-primary text-sm font-light tablet:font-normal mr-[0.5rem]'>{name}</p>
        <FontAwesomeIcon icon={faXmark} className='text-primary text-sm' />
    </div>
  )
}

export default FiltInIngBasket