import React from 'react'
import styles from '../../style'
import { RecipeCard, Navbar } from '../organisms/organisms.js'
import { SearchBarWBG } from '../molecules/molecules.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart} from '@fortawesome/free-solid-svg-icons'

const Favorites = () => {
  return (
    <div className={`${styles.boxWidth}`}>
        <Navbar />

        <div className={`${styles.container}`}>
            {/* search bar and category list*/}
            <div className='flex flex-col w-full items-center sm:items-start sm:pl-[1rem]'>
                <div className='w-full flex justify-between items-center px-[0.5rem]'>
                    <SearchBarWBG 
                    placeHolder="Search favorites"
                    bg="primary" 
                    />

                    <FontAwesomeIcon icon={faHeart} className='text-secondary text-2xl'/>
                </div>

                {/* category list */}
                <ul className='flex gap-[1rem] my-[2rem]'>
                    <li className='text-sm font-medium text-secondary cursor-pointer'>All</li>
                    <li className='text-sm font-medium text-fadeBlack cursor-pointer'>Main Dish</li>
                    <li className='text-sm font-medium text-fadeBlack cursor-pointer'>Side Dish</li>
                    <li className='text-sm font-medium text-fadeBlack cursor-pointer'>Dessert</li>
                    <li className='text-sm font-medium text-fadeBlack cursor-pointer'>Appetizer</li>
                </ul>
            </div>
            {/* recipe grid */}
            <div className='w-full grid sm:grid-cols-3 laptop:grid-cols-4 gap-[1rem] laptop:gap-[2rem] justify-items-center'>
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

                <RecipeCard 
                    image="https://i.pinimg.com/236x/97/89/48/978948078e5a96fac679d96948d1f289.jpg"
                    name="Pinakbet"
                />

                <RecipeCard 
                    image="https://i.pinimg.com/236x/06/a7/5e/06a75e6a8a9db3a1a81df30a29f3c4c8.jpg"
                    name="Chopsuey"
                />
            </div>
        </div>
    </div>
  )
}

export default Favorites