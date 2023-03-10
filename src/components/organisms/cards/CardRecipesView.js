import React from 'react'
import styles from '../../../style'
import { Navbar } from '../organisms.js'
import { BtnServing } from '../../atoms/atoms.js'
import { SearchBarWBG } from '../../molecules/molecules.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faCircleInfo } from '@fortawesome/free-solid-svg-icons'
import { faHeart, faClock } from '@fortawesome/free-regular-svg-icons'
const CardRecipesView = () => {
  return (
    <div className={`${styles.boxWidth}`}>
        <Navbar />
        <div className={`${styles.container}`}>
            <div className='w-full flex flex-col laptop:flex-row min-h-[32rem] px-[0.5rem] mb-[1rem] laptop:px-0 laptop:mb-[2rem]'>
                <div className='flex flex-col justify-center bg-bgColorTwo p-[1rem] desktop:p-[2rem] gap-[1rem] rounded-t-md laptop:max-w-[48rem] laptop:justify-start laptop:rounded-tr-none laptop:rounded-l-md laptop:w-full'>
                    <SearchBarWBG 
                        placeHolder="Search other recipes"
                        bg="primary"
                    />

                    {/* recipe image, author, name, ratings, heart, about */}
                    <div className='flex flex-col gap-[0.5rem] sm:flex-row sm:gap-[1rem]'>
                        {/* recipe image */}
                        <img src='https://i.pinimg.com/236x/d0/1f/83/d01f833028a69c2b8cc6a2350bad4597.jpg' className='flex-none w-[14rem] h-[14rem] object-cover border border-4 border-secondary rounded-md'></img>
                    

                        {/* recipe author, name, ratings and about */}
                        <div className='flex flex-col gap-[0.5rem]'>
                            {/* recipe author, name and ratings */}
                            <div className='flex flex-col gap-[0.5rem]'>
                                {/* recipe name and author*/}
                                <div className='flex justify-between items-center'>
                                    <div className='flex flex-col gap-[0.25rem]'>
                                        <span className='text-sm font-normal laptop:font-medium text-secondary'>From App</span>
                                        <span className='text-2xl font-medium text-primary'>Nilagang Baboy</span>
                                    </div>

                                    <FontAwesomeIcon icon={faHeart} className='text-secondary text-2xl' />
                                </div>

                                {/* ratings */}
                                <div className='flex gap-[0.25rem] items-center'>
                                    {/* stars */}
                                    <div className='flex gap-[0.125rem]'>
                                        <FontAwesomeIcon icon={faStar} className='text-secondary text-sm' />
                                        <FontAwesomeIcon icon={faStar} className='text-secondary text-sm' />
                                        <FontAwesomeIcon icon={faStar} className='text-secondary text-sm' />
                                        <FontAwesomeIcon icon={faStar} className='text-secondary text-sm' />
                                        <FontAwesomeIcon icon={faStar} className='text-secondary text-sm' />
                                    </div>

                                    {/* numbers */}
                                    <div className='flex gap-[0.25rem]'>
                                        <span className='text-sm font-normal laptop:font-medium text-primary'>3.8</span>
                                        <span className='text-sm font-normal laptop:font-medium text-primary'>|</span>
                                        <span className='text-sm font-normal laptop:font-medium text-primary'>10</span>
                                    </div>
                                </div>
                            </div>

                            {/* about */}
                            <div className='flex flex-col gap-[0.25rem]'>
                                <span className='text-sm font-normal laptop:font-medium text-primary'>About</span>

                                <div className='flex-auto scrollbar-thin scrollbar-thumb-[#B2D33D] scrollbar-thumb-rounded-full scrollbar-track-[#B1B1B1] scrollbar-track-rounded-full pr-[1rem]'>
                                    <p className='text-sm font-thin laptop:font-light text-primary max-h-[6rem]'>Nilagang Baboy or Pork Nilaga is translated as boiled pork in Filipino. This is a soup dish commonly served for lunch or dinner on regular days. Nilagang Baboy is eaten with steamed white rice and is best served with patis (fish sauce) and siling labuyo (birds  eye chili).
                                    Nilagang Baboy or Pork Nilaga is translated as boiled pork in Filipino. This is a soup dish commonly served for lunch or dinner on regular days. Nilagang Baboy is eaten with steamed white rice and is best served with patis (fish sauce) and siling labuyo (birds  eye chili).
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* procedures */}
                    <div className='flex flex-col gap-[0.25rem]'>
                        <span className='text-sm font-normal laptop:font-medium text-primary'>Procedures</span>

                        {/* steps list */}
                        <div className='flex scrollbar-thin scrollbar-thumb-[#B2D33D] scrollbar-thumb-rounded-full scrollbar-track-[#B1B1B1] scrollbar-track-rounded-full pr-[1rem]'>
                            <ul className='flex flex-col gap-[0.25rem] max-h-[8.5rem]'>
                                <li className='text-sm font-thin laptop:font-light text-primary flex flex-col gap-[0.125rem]'><span className='text-sm font-light laptop:font-normal text-secondary'>Step 1</span>Pour water in the pot and add pork meat and simmer it until the meat is tender.</li>
                                <li className='text-sm font-thin laptop:font-light text-primary flex flex-col gap-[0.125rem]'><span className='text-sm font-light laptop:font-normal text-secondary'>Step 1</span>Pour water in the pot and add pork meat and simmer it until the meat is tender.</li>
                                <li className='text-sm font-thin laptop:font-light text-primary flex flex-col gap-[0.125rem]'><span className='text-sm font-light laptop:font-normal text-secondary'>Step 1</span>Pour water in the pot and add pork meat and simmer it until the meat is tender.</li>
                                <li className='text-sm font-thin laptop:font-light text-primary flex flex-col gap-[0.125rem]'><span className='text-sm font-light laptop:font-normal text-secondary'>Step 1</span>Pour water in the pot and add pork meat and simmer it until the meat is tender.</li>
                                <li className='text-sm font-thin laptop:font-light text-primary flex flex-col gap-[0.125rem]'><span className='text-sm font-light laptop:font-normal text-secondary'>Step 1</span>Pour water in the pot and add pork meat and simmer it until the meat is tender.</li>
                                <li className='text-sm font-thin laptop:font-light text-primary flex flex-col gap-[0.125rem]'><span className='text-sm font-light laptop:font-normal text-secondary'>Step 1</span>Pour water in the pot and add pork meat and simmer it until the meat is tender.</li>
                                <li className='text-sm font-thin laptop:font-light text-primary flex flex-col gap-[0.125rem]'><span className='text-sm font-light laptop:font-normal text-secondary'>Step 1</span>Pour water in the pot and add pork meat and simmer it until the meat is tender.</li>
                                <li className='text-sm font-thin laptop:font-light text-primary flex flex-col gap-[0.125rem]'><span className='text-sm font-light laptop:font-normal text-secondary'>Step 1</span>Pour water in the pot and add pork meat and simmer it until the meat is tender.</li>
                            </ul>
                        </div>                        
                    </div>
                </div>
                
                {/* side ingredients and others */}
                <div className='flex flex-col justify-center bg-primary py-[1rem] px-[1rem] laptop:max-w-[16rem] laptop:justify-start rounded-b-md laptop:rounded-bl-none laptop:rounded-r-md laptop:w-full'>
                    <div className='flex flex-col justify-between laptop:h-full'>
                        {/* estimated time and ingredients */}
                        <div className='flex flex-col gap-[0.25rem] laptop:gap-[0.5rem] '>
                            {/* estimated time */}
                            <div className='flex justify-center items-center gap-[0.25rem] laptop:gap-[0.25rem] laptop:flex-col desktop:flex-row desktop:gap-[0.5rem]'>
                                <div className='flex gap-[0.125rem] laptop:gap-[0.25rem] items-center'>
                                    <FontAwesomeIcon icon={faClock} className='text-fadeBlack text-sm' />

                                    <span className='text-sm font-light laptop:font-normal text-fadeBlack'>Estimated Time</span>
                                </div>

                                {/* time */}
                                <span className='text-sm font-light laptop:font-normal text-mainBlack'>40 minutes</span>
                            </div>

                            {/* ingredients, servings, integral and not integral */}
                            <div className='flex flex-col gap-[0.25rem] laptop:gap-[0.5rem]'>
                                <span className='text-sm font-normal laptop:font-medium text-mainBlack'>Ingredients</span>

                                <div className='flex flex-col gap-[0.5rem] laptop:gap-[1rem]'>
                                    {/* servings */}
                                    <div className='flex gap-[0.25rem] desktop:gap-[0.5rem]'>
                                        <BtnServing
                                            val="1 serving" 
                                        />

                                        <BtnServing
                                            val="3 servings" 
                                        />

                                        <BtnServing
                                            val="5 servings" 
                                        />
                                    </div>

                                    {/* integral ingredients */}
                                    <div className='flex flex-col gap-[0.25rem] laptop:gap-[0.5rem]'>
                                        {/* title */}
                                        <div className='flex justify-start gap-[0.25rem]'>
                                            <span className='text-sm font-light laptop:font-normal text-mainBlack'>Integral Ingredients</span>

                                            <FontAwesomeIcon icon={faCircleInfo} className='text-secondary/60 text-[0.5rem]' />
                                        </div>

                                        {/* ingredients */}
                                        <ul className='flex flex-col gap-[0.125rem] laptop:gap-[0.25rem]'>
                                            <li className='text-sm font-thin laptop:font-light text-mainBlack'>Pork</li>
                                        </ul>
                                    </div>

                                    {/* not integral ingredients */}
                                    <div className='flex flex-col gap-[0.25rem] laptop:gap-[0.5rem]'>
                                        {/* title */}
                                        <div className='flex justify-start gap-[0.25rem]'>
                                            <span className='text-sm font-light laptop:font-normal text-mainBlack'>Not Integral Ingredients</span>

                                            <FontAwesomeIcon icon={faCircleInfo} className='text-secondary/60 text-[0.5rem]' />
                                        </div>

                                        {/* ingredients */}
                                        <ul className='flex flex-col gap-[0.125rem] laptop:gap-[0.25rem]'>
                                            <li className='text-sm font-thin laptop:font-light text-mainBlack'>Red Onion</li>
                                            <li className='text-sm font-thin laptop:font-light text-mainBlack'>Petchay</li>
                                            <li className='text-sm font-thin laptop:font-light text-mainBlack'>Corn</li>
                                            <li className='text-sm font-thin laptop:font-light text-mainBlack'>Riped Banana</li>
                                            <li className='text-sm font-thin laptop:font-light text-mainBlack'>Sitaw</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button className='flex justify-center items-center mt-[1rem] bg-gradient-to-r from-[#B2D33D] to-[#59981A] text-primary text-sm font-normal laptop:font-medium py-[0.5rem] rounded-sm laptop:rounded-md laptop:mt-auto'>Try Now</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CardRecipesView

