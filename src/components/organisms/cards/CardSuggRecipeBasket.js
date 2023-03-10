import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart} from '@fortawesome/free-regular-svg-icons'

function CardSuggRecipeBasket() {
  return (
    <div className='col-span-1 max-w-[450px] min-h-[100px] sm:w-[450px] flex flex-col sm:flex-row rounded-md shadow-md'>
        <img src="http://images.summitmedia-digital.com/yummyph/images/2019/08/30/spicybeefbulalorecipe.jpg" alt="" className='w-full object-cover rounded-t-md sm:w-[150px] sm:h-[100px] sm:rounded-l-md sm:rounded-r-none'/>
        
        <div className='flex flex-col w-full'>
            <div className='flex w-full justify-between items-center px-[5px] pt-[5px]'>
                <h3 className='text-base font-medium'>Bulalo</h3>
                <FontAwesomeIcon icon={faHeart} className='text-base text-fadeText'/> 
            </div>
            <p className='text-sm font-normal text-fadeText mx-[5px] mb-[5px]'>have <span className='text-sm font-normal text-black'>2</span> ingredients</p>
        </div>
    </div>
  )
}

export default CardSuggRecipeBasket