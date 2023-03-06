import React from 'react'
import SearchBarWBG from '../molecules/SearchBarWBG'
import styles from '../../style'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock } from '@fortawesome/free-regular-svg-icons'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import BtnServing from '../atoms/BtnServing'

function CardRecipeView() {
  return (
    <div className={`${styles.boxWidth}`}>
      {/* <div className='w-full h-[820px] bg-[#F2F1F0]'>
        <div className='w-[80%] h-[750px] m-auto flex pt-11'>
            <div className='w-[1068px] h-[730px] bg-[#20262E]'>
              <SearchBarWBG />
            </div>

            <div className='w-[556px] h-[730px] bg-[#FFFFFF]'>

            </div>
        </div> */}

        <div className={`${styles.contentBox}`}>
            <div className='grid grid-cols-4 w-full h-100 bg-black m-[2rem] min-h-[32rem] box-border'>
                {/* main content */}
                <div className='col-span-3'>
                    <div className='w-[22rem] h-[2.188rem] p-6'>
                    <SearchBarWBG />
                        <div className='flex'>                         
                            <img src='https://yummykitchentv.com/wp-content/uploads/2022/10/nilagang-baboy.jpg' className='w-[14rem] h-[14rem] border-solid border-[#B2D33D] border-[0.25rem] mt-4'></img>

                            <div className='mx-6 py-3'>
                                <p className='w-[3.875] h-[1.125rem] text-[0.875rem] font-medium text-[#B2D33D]'>From App</p>
                                <h1 className='w-[21.438rem] h-[2.5rem] font-bold text-[2.5rem] text-[#FFFFFF]'>Nilagang Baboy</h1>

                                <div className='flex mt-8'>
                                    <FontAwesomeIcon icon={faStar} className='text-[#B2D33D] text-sm' />
                                    <FontAwesomeIcon icon={faStar} className='text-[#B2D33D] text-sm' />
                                    <FontAwesomeIcon icon={faStar} className='text-[#B2D33D] text-sm' />
                                    <FontAwesomeIcon icon={faStar} className='text-[#B2D33D] text-sm' />
                                    <FontAwesomeIcon icon={faStar} className='text-[#B2D33D] text-sm' />

                                    <p className='text-[#FFFFFF] px-2 -translate-y-1'>3.8 | 10</p>
                                </div>

                                <p className='text-white w-[2.438rem] h-[1.125rem] font-medium text-[0.875rem]'>About </p>
                                <p className='text-white w-[29rem] h-[5rem] font-light text-[0.875rem]'>Nilagang Baboy or Pork Nilaga is translated as boiled pork in Filipino. This is a soup dish commonly served for lunch or dinner on regular days. Nilagang Baboy is eaten with steamed white rice and is best served with patis (fish sauce) and siling labuyo (birds  eye chili).</p>
                            </div>
                        </div>

                        <div className='mt-4 space-y-2 scrollbar-thin scrollbar-thumb-[#B2D33D] scrollbar-thumb-rounded-full scrollbar-track-[#B1B1B1] scrollbar-track-rounded-full h-[9.75rem] w-[45rem]'>
                            <p className='text-white w-[4.063] h-[1.125rem] text-[0.875rem] font-medium'>Procedure </p>
                            <p className='text-[#B2D33D] w-[3.313rem] h-[1.125rem] text-[0.875rem] font-normal'>Step 1</p>
                            <p className='text-white w-[39.75rem] h-[1.125rem] text-[0.875rem] font-light'>Pour water in the pot and add pork meat and simmer it until the meat is tender.</p>
                            <p className='text-[#B2D33D] w-[3.313rem] h-[1.125rem] text-[0.875rem] font-normal'>Step 2</p>
                            <p className='text-white w-[39.75rem] h-[1.125rem] text-[0.875rem] font-light'>Add the sinigang mix and additional seasonings as preffered.</p>
                            <p className='text-[#B2D33D] w-[3.313rem] h-[1.125rem] text-[0.875rem] font-normal'>Step 3</p>
                            <p className='text-white w-[39.75rem] h-[1.125rem] text-[0.875rem] font-light'>Add any tough vegetable like Talong, Labanos, Sitaw and such. And cook those until they become firm</p>
                        </div>
                    </div>

                </div>

                {/* side white */}
                    <div className='flex space-x-3'>
                        <p className='w-[6.125rem] h-[1.125rem] font-normal text-[0.875rem] text-[#00000099] pt-1'>Estimated Time</p>
                        <FontAwesomeIcon icon={faClock} className='text-[#00000099] text-sm pt-1'/>
                        <p className='w-[5.313rem] h-[1.125rem] font-normal text-[0.875] text-[#000000]'>40 minutes</p>
                    </div>

                    <p className='w-[4.438rem] h-[1.095rem] font-medium text-[0.875rem] text-[#000000] pt-5'>Ingredients</p>
                    
                    <div className='pt-5 space-x-2'>
                        <button className='w-[4rem] h-[1.5rem] text-[0.75rem] border-[1px] border-solid border-[#EDEDED] rounded-[0.188rem] hover:bg-[#B2D33D]'>1 serving</button>
                        <button className='w-[4rem] h-[1.5rem] text-[0.75rem] border-[1px] border-solid border-[#EDEDED] rounded-[0.188rem] hover:bg-[#B2D33D]'>3 servings</button>
                        <button className='w-[4rem] h-[1.5rem] text-[0.75rem] border-[1px] border-solid border-[#EDEDED] rounded-[0.188rem] hover:bg-[#B2D33D]'>5 servings</button>
                    </div>

                    <div className='pt-6 space-y-2'>
                        <p className='text-[#00000099] text-[0.75rem]'>Integral Ingredients</p>
                        <p className='text-black text-[0.75rem]'>Pork</p>
                    </div>
                    <div className='pt-5 space-y-2'>
                        <p className='text-[#00000099] text-[0.75rem]'>Not Integral Ingredients</p>
                        <p className='text-black text-[0.75rem]'>Red Onion</p>
                        <p className='text-black text-[0.75rem]'>Petchay</p>
                        <p className='text-black text-[0.75rem]'>Corn</p>
                        <p className='text-black text-[0.75rem]'>Riped Banana</p>
                        <p className='text-black text-[0.75rem]'>Sitaw</p>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default CardRecipeView

