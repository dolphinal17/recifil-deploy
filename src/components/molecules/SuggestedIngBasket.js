import React from 'react'
import { BtnSuggIngIO } from '../atoms/atoms.js'
import styles from '../../style.js'

const SuggestedIngBasket = ( {name} ) => {
  return (
    <div className='flex flex-wrap items-start justify-start'>
        <div className={`p-[5px] rounded-md ${styles.flexCenter} shadow-md border-solid border-[1px] border-[#EDEDED`}>
            <p className='text-sm font-light tablet:font-normal mr-[10px]'>{name}</p>

            <div className='flex gap-[5px]'>
                <BtnSuggIngIO
                  name="IN"
                />
                
                <BtnSuggIngIO
                  name="OUT"
                />
            </div>
        </div>                            
    </div>
  )
}

export default SuggestedIngBasket