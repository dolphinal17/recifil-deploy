import React from 'react'
import styles from '../../style'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClipboard } from '@fortawesome/free-regular-svg-icons'
import { faUtensils } from '@fortawesome/free-solid-svg-icons'

const RecipeProcess = () => {
  return (
    <div className={`${styles.boxWidth}`}>
        <div className={`${styles.contentBox}`}>
            <div className='flex w-[64rem] h-[3.25rem] bg-mainBlack text-primary p-[1rem] items-center text-[1rem]'>
                <h1 className='w-full'>Let's make this recipe! </h1>
                <a href='#' className='hover:text-secondary'>Proceed</a>
            </div>

{/*box*/}
            <div className='grid grid-cols-2 w-[64rem] h-[24.75rem]'>
                <div className='bg-primary w-full h-[24.75rem] col-span-1 p-7'>
                    <div className='flex pb-5'>
                        <FontAwesomeIcon icon={faClipboard} className='text-sm py-1 px-2' />
                        <p>Checking your ingredients...</p>
                    </div>

                    <div className='flex'>
                        <div className='w-[16rem] space-y-2'>
                            <p className='text-[0.875rem] text-fadeBlack font-medium'>Integral ingredients</p>
                            <input type={'checkbox'} id='box1' className=''></input>
                            <label htmlFor='box1' className='text-[0.875rem] px-2'>Pork</label>

                            <p className='text-[0.875rem] text-fadeBlack font-medium'>Not Integral Ingredients</p>
                            <input type={'checkbox'} id='box2' className=''></input>
                            <label htmlFor='box2' className='text-[0.875rem] px-2'>Red Onion</label><br></br>
                            <input type={'checkbox'} id='box3' className=''></input>
                            <label htmlFor='box3' className='text-[0.875rem] px-2'>Petchay</label><br></br>
                            <input type={'checkbox'} id='box4' className=''></input>
                            <label htmlFor='box4' className='text-[0.875rem] px-2'>Corn</label><br></br>
                            <input type={'checkbox'} id='box5' className=''></input>
                            <label htmlFor='box5' className='text-[0.875rem] px-2'>Riped Banana</label><br></br>
                            <input type={'checkbox'} id='box6' className=''></input>
                            <label htmlFor='box6' className='text-[0.875rem] px-2'>Sitaw</label>
                        </div>
                        <div className='w-[16rem] space-y-2'>
                            <p className='text-[0.875rem] text-fadeBlack font-medium'>Alternative ingredients for <p className='text-black'>'Red Onion'</p></p>
                            <input type={'checkbox'} id='box7' className=''></input>
                            <label htmlFor='box7' className='text-[0.875rem] px-2'>Shallot</label><br></br>
                            <input type={'checkbox'} id='box8' className=''></input>
                            <label htmlFor='box8' className='text-[0.875rem] px-2'>Leek</label><br></br>
                            <input type={'checkbox'} id='box9' className=''></input>
                            <label htmlFor='box9' className='text-[0.875rem] px-2'>Green Onion</label><br></br>
                            <input type={'checkbox'} id='box10' className=''></input>
                            <label htmlFor='box10' className='text-[0.875rem] px-2'>Celery</label>
                        </div>
                    </div>
                </div>
{/*box 2*/}
                <div className='bg-bgColor w-[32rem] h-[24.75rem] col-span-1 p-7'>
                    <div className='flex pb-2'>
                        <FontAwesomeIcon icon={faUtensils} className='text-sm py-1 px-2' />
                        <p>Preparing your ingredients...</p>
                    </div>

                    <div className='space-x-2'>
                        <button className='w-[4rem] h-[1.5rem] text-[0.75rem] border-[1px] border-solid border-[#EDEDED] rounded-[0.188rem] bg-primary hover:bg-[#B2D33D]'>1 serving</button>
                        <button className='w-[4rem] h-[1.5rem] text-[0.75rem] border-[1px] border-solid border-[#EDEDED] rounded-[0.188rem] bg-primary hover:bg-[#B2D33D]'>3 servings</button>
                        <button className='w-[4rem] h-[1.5rem] text-[0.75rem] border-[1px] border-solid border-[#EDEDED] rounded-[0.188rem] bg-primary hover:bg-[#B2D33D]'>5 servings</button>
                    </div>

                    <div className='pt-4'>
                        <p className='text-[0.875rem] text-fadeBlack font-medium'>Ingredients</p>
                            <input type={'checkbox'} id='box11' className=''></input>
                            <label htmlFor='box11' className='text-[0.875rem] px-2'>Pork  1/4 kg (Belly or shoulder, chop it into cubes)</label><br></br>
                            <input type={'checkbox'} id='box12' className=''></input>
                            <label htmlFor='box12' className='text-[0.875rem] px-2'>Celery 1 trunk (Chop it into small pieces)</label><br></br>
                            <input type={'checkbox'} id='box13' className=''></input>
                            <label htmlFor='box13' className='text-[0.875rem] px-2'>Petchay 1 or 2 pcs (Peel off its leaves)</label><br></br>
                            <input type={'checkbox'} id='box14' className=''></input>
                            <label htmlFor='box14' className='text-[0.875rem] px-2'>Corn 1 or 2 pcs (Slice in three parts)</label><br></br>
                            <input type={'checkbox'} id='box15' className=''></input>
                            <label htmlFor='box15' className='text-[0.875rem] px-2'>Riped Banana 3 pcs (Slice in half crosswise)</label><br></br>
                            <input type={'checkbox'} id='box16' className=''></input>
                            <label htmlFor='box16' className='text-[0.875rem] px-2'>Sitaw 5 pcs (Slice in half crosswise)</label>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default RecipeProcess