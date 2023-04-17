import React, { useState } from 'react'
import { BtnOutBasket, BtnSuggIngIO } from '../atoms/atoms.js'
import styles from '../../style.js'

const SuggestedIngBasket = ( {name, onAddIngredient, onRemoveIngredient, selectedIngredients} ) => {
  const inBasket = selectedIngredients.includes(name);
  

    const handleInClick = () => {
    if (!inBasket) {
      onAddIngredient(name);
    }
  }
  const handleOutClick = () => {
    if (inBasket) {
      onRemoveIngredient(name);
    }
  }

  return (
    <div className='flex flex-wrap items-start justify-start'>
        <div className={`p-[5px] rounded-md ${styles.flexCenter} shadow-md border-solid border-[1px] border-[#EDEDED`}>
            <p className='text-sm font-light tablet:font-normal mr-[10px]'>{name}</p>

            <div className='flex gap-[5px]'>
                <BtnSuggIngIO
                  name="IN"
                  onClick={handleInClick}
                  disabled={selectedIngredients.includes(name)}
                />
                
                <BtnOutBasket
                  name="OUT"
                  onClick={handleOutClick}
                />
            </div>
        </div>                            
    </div>
  )
}

export default SuggestedIngBasket