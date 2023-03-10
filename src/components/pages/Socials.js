import React, { useState } from 'react'
import styles from '../../style'
import { CardPost, RecipeCard, Navbar, CardCreatePost } from '../organisms/organisms.js'
import CreatePost from '../../assets/create-post.png'

function Socials() {
    const [openModal, setOpenModal] = useState(false)

  return (
    <div className={`${styles.boxWidth}`}>
        <Navbar />
        <CardCreatePost open={openModal} onClose={() => setOpenModal(false)}/>
        <div className={`${styles.container} relative`}>
            <div className='w-full flex justify-between laptop:gap-[1.25rem] desktop:gap-[2rem] relative'>
                {/* post section */}
                <div className='max-w-[47.5rem] w-full'>
                    <div className='w-full flex flex-col items-center laptop:items-start'>
                       <button onClick={() => setOpenModal(true)} className='p-[0.5rem] text-sm font-medium text-mainBlack bg-primary flex gap-[0.5rem] items-center rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)] mb-[1rem]'><img src={CreatePost} className='w-[0.875rem]'></img>Create New</button>
                    </div>

                    {/* posts */}
                    <div className='grid grid-cols-1 gap-[0.5rem] justify-items-center'>
                        <CardPost 
                            usersName="Sample Name"
                            about="This is my about"
                            recipeName="Adobo"
                            usersImage="https://i.pinimg.com/564x/25/65/46/25654639ef43d6cd59e062bc2cec1a2c.jpg"
                            recipeImage="https://i.pinimg.com/236x/90/b7/c9/90b7c95b0112ecbcf8580e6abdffcdbe.jpg"
                        />

                        <CardPost 
                            usersName="Sample Name"
                            about="This is my about"
                            recipeName="Pinakbet"
                            usersImage="https://i.pinimg.com/564x/25/65/46/25654639ef43d6cd59e062bc2cec1a2c.jpg"
                            recipeImage="https://i.pinimg.com/564x/23/09/55/2309558ab7ecb9d7208f2cb96bd368da.jpg"
                        />
                    </div>
                </div>

                <div className='hidden laptop:block'>
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
                            image="https://i.pinimg.com/236x/ed/0d/29/ed0d2931c988277eac062f30dfa99443.jpg"
                            name="Adobong Manok"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Socials