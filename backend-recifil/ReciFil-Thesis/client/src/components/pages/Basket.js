import React from 'react'
import styles from '../../style'
import { SearchBarWBG, FiltInIngBasket, FiltOutIngBasket } from '../molecules/molecules.js'
import { CardIngSugg, RecipeCard } from '../organisms/organisms.js'

const Basket = () => {
  return (
    <div className={`${styles.boxWidth}`}>
      <div className={`${styles.container}`}>
        <div className='w-full grid tablet:grid-cols-2 rounded-md'>
          {/* building section */}
          <div className='col-gap-1 flex flex-col items-center bg-bgColorTwo py-[1rem] tablet:py-[2rem]  rounded-t-md tablet:rounded-l-md'>
            {/* search bar */}
            <SearchBarWBG
              placeHolder="Search ingredients"
              bg="primary"
            />

            {/* filtering */}
            <div className='w-full grid laptop:grid-cols-2 px-[1rem] divide-y laptop:divide-x laptop:divide-y-0 my-[1rem]'>
              {/* filtered in */}
              <div className={`col-span-1 flex flex-col items-center justify-start px-[1rem]`}>
                <h3 className='text-sm font-medium text-primary mb-[10px]'>FILTERED IN</h3>

                <div className='flex flex-wrap'>
                    <FiltInIngBasket 
                      name="Pork"
                    />
                </div>
              </div>

              {/* filtered out */}
              <div className={`col-span-1 flex flex-col items-center justify-start px-[1rem]`}>
                <h3 className='text-sm font-medium text-primary mb-[10px] mt-[0.5rem] laptop:mt-0'>FILTERED OUT</h3>

                <div className='flex flex-wrap'>
                    <FiltOutIngBasket 
                      name="Soy Sauce"
                    />
                </div>
              </div>
            </div>

            {/* suggested ingredients */}
            <div className='w-full px-[1rem]'>
              <h1 className='text-sm font-medium text-secondary text-center mb-[0.5rem]'>Ingredients Suggestions</h1>

              {/* ingredients */} 
              <div className='w-full grid laptop:grid-cols-2 gap-[0.5rem] justify-items-center'>
                {/* meats */}
                <CardIngSugg
                  nameCateg="Meats"
                  nameIng1="Pork"
                  nameIng2="Beef"
                  nameIng3="Turkey"
                  nameIng4="Goat"
                />

                {/* vegetables and fruits */}
                <CardIngSugg
                  nameCateg="Vegetables and Fruits"
                  nameIng1="Cabbage"
                  nameIng2="Corn"
                  nameIng3="Tomato"
                  nameIng4="Carrot"
                />

                {/* seasonings */}
                <CardIngSugg
                  nameCateg="Seasonings"
                  nameIng1="Soy"
                  nameIng2="Vinegar"
                  nameIng3="Curry"
                  nameIng4="Salt"
                />

                {/* seafoods */}
                <CardIngSugg
                  nameCateg="Seafoods"
                  nameIng1="Fish"
                  nameIng2="Lobster"
                  nameIng3="Squid"
                  nameIng4="Shrimp"
                />
              </div>
            </div>
          </div>

          {/* suggestions section */}
          <div className='col-gap-1 py-[1rem] tablet:py-[2rem] px-[1rem] bg-primary rounded-b-md tablet:rounded-r-md'>
            <div className='flex flex-col items-center gap-[1rem]'>
              <div className='p-[0.5rem] bg-bgColorTwo rounded-md'>
                <label className='text-sm font-medium text-secondary'>Recipe Suggestions</label>
              </div>

              <div className='grid laptop:grid-cols-2 gap-[1rem]'>
                <RecipeCard
                  image="https://i.pinimg.com/236x/56/b2/18/56b2183fd66c8a8d9c7eabc92b3a33f7.jpg"
                  name="Ampalaya"
                />

                <RecipeCard
                  image="https://i.pinimg.com/236x/56/b2/18/56b2183fd66c8a8d9c7eabc92b3a33f7.jpg"
                  name="Ampalaya"
                />

                <RecipeCard
                  image="https://i.pinimg.com/236x/56/b2/18/56b2183fd66c8a8d9c7eabc92b3a33f7.jpg"
                  name="Ampalaya"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Basket