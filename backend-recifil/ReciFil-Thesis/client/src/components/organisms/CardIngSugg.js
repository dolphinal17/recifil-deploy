import React from 'react'
import { SuggestedIngBasket } from '../molecules/molecules.js'

export default function CardIngSugg( { nameCateg, nameIng1, nameIng2, nameIng3, nameIng4 } ) {
  return (
    <div className='laptop:max-w-[14.75rem] w-full min-h-[14rem] bg-primary rounded-md px-[1rem] py-[0.5rem]'>
        <h1 className='text-sm font-medium text-mainBlack text-center mb-[0.5rem]'>{nameCateg}</h1>

        {/* ingredients */}
        <div className='grid grid-cols-2 laptop:grid-cols-1 gap-[0.5rem]'>
            <SuggestedIngBasket
                name={nameIng1}
            />

            <SuggestedIngBasket
                name={nameIng2}
            />

            <SuggestedIngBasket
                name={nameIng3}
            />

            <SuggestedIngBasket
                name={nameIng4}
            />
        </div>
    </div>
  )
}
