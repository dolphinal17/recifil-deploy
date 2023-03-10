import React from 'react';
import Discimg from '../organisms/others/DiscImgWText'
import styles from '../../style';
import { RecipeCard, Navbar, DiscImgWText } from '../organisms/organisms.js'


const Discover = () => {
  return (
    <div>
      <div className={`${styles.boxWidth}`}>
        <Navbar/>

        <div className={`${styles.container}`}>
          <DiscImgWText/>

          <div className='w-full flex flex-col gap-[0.5rem]'>
            {/* header */}
            <div className='w-full flex justify-between items-center px-[1rem] laptop:px-0'>
              <span className='text-base laptop:text-2xl font-normal laptop:font-medium text-mainBlack'>Famous Filipino Recipes</span>

              <span className='text-sm laptop:text-base font-normal laptop:font-medium text-secondary'>Explore More</span>
            </div>

            {/* recipes */}
            <div className='w-full flex flex-wrap gap-[0.5rem] tablet:gap-[1rem] justify-center'>
              <RecipeCard 
                  image="https://i.pinimg.com/236x/56/b2/18/56b2183fd66c8a8d9c7eabc92b3a33f7.jpg"
                  name="Ampalaya"
              />

              <RecipeCard 
                  image="https://i.pinimg.com/236x/ed/0d/29/ed0d2931c988277eac062f30dfa99443.jpg"
                  name="Adobong Manok"
              />

              <RecipeCard 
                  image="https://i.pinimg.com/236x/6e/fd/bf/6efdbf7d16f7dc058b83b51448149e67.jpg"
                  name="Bulalo"
              />
              
              <RecipeCard 
                  image="https://i.pinimg.com/236x/ec/95/8f/ec958f900835a42319e14de1a8c46984.jpg"
                  name="Sisig"
              />
            </div>
          </div>
          
          {/* <div className='w-full tablet:px-[0.5rem] laptop:px-0 grid sm:grid-cols-2 tablet:grid-cols-3 laptop:grid-cols-4 gap-[1rem] laptop:gap-[2rem] justify-items-center'>
            
          </div> */}
        </div>
      </div>
    </div>
  )
}

export default Discover;