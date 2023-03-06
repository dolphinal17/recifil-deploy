import React from 'react'
import styles from '../../style'
import { CardPost, RecipeCard } from '../organisms/organisms.js'
import CreatePost from '../../assets/create-post.png'

function Socials() {
  return (
    <div className={`${styles.boxWidth}`}>
        <div className={`${styles.container}`}>
            <div className='w-full grid laptop:grid-cols-4 justify-items-center laptop:gap-[1.25rem] desktop:gap-[2rem]'>
                {/* post section */}
                <div className='w-full col-span-1 laptop:col-span-3 tablet:pl-[0.5rem] laptop:pl-0'>
                    <div className='w-full flex flex-col items-center laptop:items-start'>
                        <button className='p-[0.5rem] text-sm font-medium text-mainBlack bg-primary flex gap-[0.5rem] items-center rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)] mb-[1rem]'><img src={CreatePost} className='w-[0.875rem]'></img>Create New</button>
                    </div>

                    {/* posts */}
                    <div className='grid grid-cols-1 gap-[0.5rem] justify-items-center'>
                        <CardPost 
                            usersName="Carlo Cortes"
                            about="This is my about"
                            recipeName="Adobo"
                            usersImage="https://i.pinimg.com/236x/90/b7/c9/90b7c95b0112ecbcf8580e6abdffcdbe.jpg"
                            recipeImage="https://i.pinimg.com/236x/90/b7/c9/90b7c95b0112ecbcf8580e6abdffcdbe.jpg"
                        />

                        <CardPost 
                            usersName="Carlo Cortes"
                            about="This is my about"
                            recipeName="Adobo"
                            usersImage="https://i.pinimg.com/236x/90/b7/c9/90b7c95b0112ecbcf8580e6abdffcdbe.jpg"
                            recipeImage="https://i.pinimg.com/236x/90/b7/c9/90b7c95b0112ecbcf8580e6abdffcdbe.jpg"
                        />
                    </div>
                </div>

                <div className='hidden laptop:cols-span-1 laptop:block'>
                    <div className='flex justify-between px-[0.5rem] mb-[0.5rem]'>
                        <label className='text-sm font-medium text-mainBlack'>Recipes from App</label>
                        <label className='text-sm font-medium text-secondary cursor-pointer'>All</label>
                    </div>

                    {/* recipes */}
                    <div className='flex flex-col gap-[0.5rem]'>
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
  )
}

export default Socials