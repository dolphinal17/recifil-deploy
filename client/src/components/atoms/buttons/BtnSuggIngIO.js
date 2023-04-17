import React from 'react'
import styles from '../../../style.js'

function BtnSuggIngIO( {name, onClick} ) {
  return (
    <button className={`w-[36px] h-[19px] ${styles.flexCenter} text-sm font-thin tablet:font-light border-solid border-[1px] border-[#EDEDED] rounded-sm`}
    onClick={ onClick }
    
    >
      {name}
    </button>
    )
}

export default BtnSuggIngIO