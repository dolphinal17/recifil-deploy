import React from 'react'
import styles from '../../../style.js'

function BtnSuggIngIO( {name} ) {
  return (
    <button className={`w-[36px] h-[19px] ${styles.flexCenter} text-sm font-thin tablet:font-light border-solid border-[1px] border-[#EDEDED] rounded-sm`}>{name}</button>
  )
}

export default BtnSuggIngIO