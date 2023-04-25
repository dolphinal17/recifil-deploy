import React from 'react'
// import { useEffect, useState } from 'react';
// import axios from 'axios';
import styles from '../../style'
import { LandingNavbar, LandingFooter } from '../organisms/organisms.js'
import { Link } from 'react-router-dom'

const Landing = () => {
  // const [message, setMessage] = useState('');

  // useEffect(() => {
  //   axios.get('http://localhost:4000/api')
  //     .then(response => {
  //       setMessage(response.data.message);
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // }, []);
  return (
    <div className={`${styles.boxWidth} scrollbar-thin scrollbar-thumb-[#B2D33D] scrollbar-thumb-rounded-full scrollbar-track-[#B1B1B1] scrollbar-track-rounded-full`}>
      <div className='w-full bg-primary grid-cols-1 gap-[2rem] pb-[2rem] min-h-screen'>
        <LandingNavbar />

        {/* shadow-[5px_0_10px_rgb(0,0,0,0.1)] */}
        <div className='desktop:w-[65rem] laptop:w-[58rem] tablet:w-[43rem] sm:w-[35rem] w-[20rem] laptop:h-[512px] h-auto border border-zinc-300 rounded-t-[2rem] m-auto flex flex-col'>
          <div className='tablet:flex-row flex-col flex tablet:w-[80%] w-[100%] m-auto py-10 gap-[1rem]'>
            <div className='tablet:w-[60%] w-[100%] flex flex-col items-center'>
              <h1 className='text-2xl laptop:text-5xl text-textMainBlack font-medium tablet:font-semibold'>An AI Filipino  <span className='text-[#59981A]'> Recipe Builder</span></h1>
              <h2 className='text-base laptop:text-3xl font-normal tablet:font-medium text-textMainBlack '>Discover your inner Filipino, with our app.</h2>
            </div>

            <div className='m-auto'>
              <img src="https://firebasestorage.googleapis.com/v0/b/firestore-328db.appspot.com/o/webimages%2FLandingImage.png?alt=media&token=4d4d6341-1804-400b-8589-810980dbdcc1" alt='landingimg' className='w-[12rem] tablet:w-[16rem]' />
            </div>
          </div>

          <div className='w-full h-[4rem] sm:px-[2rem] px-[1rem] bg-bgColorTwo flex justify-between items-center'>
            <div className=''>
              <h1 className='laptop:text-[24px] tablet:text-[20px] sm:text-[15px] text-[10px] font-[400] text-primary'>Explore Trending recipe on <span className='text-secondary'> ReciFil</span></h1>
            </div>

            <div className='flex justify-between items-center sm:gap-4 gap-1 '>
              <div>
                <h1 className='laptop:text-[18px] sm:text-[14px] text-[10px] text-primary font-[400]'>Let's get started</h1>
              </div>

              <div className='flex items-center'>
                <Link to='/login'><button className='laptop:text-[18px] sm:text-[14px] text-[10px] text-primary font-[400] laptop:w-[146px] sm:w-[100px] w-[50px] laptop:h-[49px] sm:h-[30px] h-[20px] rounded-[10px] bg-gradient-to-r from-secondary to-[#59981A] hover:bg-gradient-to-l hover:from-[#59981A] hover:to-secondary duration-200'>Start</button></Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={`flex w-full max-w-[64rem] flex-col items-start justify-start bg-transparent pt-[1rem] laptop:pt-[2rem] laptop:px-[1rem] desktop:px-0`}>
        <div className='flex flex-col items-center laptop:max-w-[42rem] sm:max-w-[38rem] max-w-[20rem] m-auto pb-5 gap-[1rem]'>
          <div className='p-[0.5rem] rounded-md bg-fadeText'>
            <h2 className='text-sm tablet:text-base text-primary font-normal tablet:font-medium'>THE SOLUTION</h2>
          </div>

          <h1 className='text-base sm:text-[2rem] font-medium tablet:font-semibold text-center text-textMainBlack'>"Experience the taste of the Philippines with our app's exciting features”</h1>
        </div>

        <div className='py-2'>
          <div className='desktop:w-full w-[90%] sm:min-h-[512px] min-h-auto bg-primary border rounded-[32px] grid sm:grid-cols-2 m-auto items-center py-4'>
            <div className='col-span-1 flex justify-center items-center'>
              <div className='laptop:w-[25rem] sm:w-[15rem] w-[18rem] laptop:h-[25rem] sm:h-[15rem] h-[13rem]'>
                <img src="https://firebasestorage.googleapis.com/v0/b/firestore-328db.appspot.com/o/webimages%2Ffeat-1.png?alt=media&token=7f231bea-4a52-4a2f-8ff7-5386eca379ef" alt='landingimg' className='w-full h-full object-cover rounded-[2rem]' />
              </div>
            </div>
            <div className='col-span-1 p-[2rem]'>
              <h1 className=' text-textMainBlack font-[600] sm:text-[28px] text-[1rem]'>Explore Our Recipe Library Today!</h1>
              <h2 className='text-textFadeBlack text-[16px] font-[400] sm:pr-[3.5rem]'>Discover the vibrant and delicious cuisine of the Philippines with our extensive recipe library.</h2>
            </div>
          </div>
        </div>

        <div className='py-2'>
          <div className='desktop:w-full w-[90%] sm:min-h-[512px] min-h-auto bg-primary border rounded-[32px] grid sm:grid-cols-2 m-auto items-center py-4'>
            {/* <div> */}
            <div className='col-span-1 p-[2rem] sm:order-first order-last'>
              <h1 className=' text-textMainBlack font-[600] sm:text-[28px] text-[1rem]'>Create Culinary Magic with Our Ingredient-Based Recipe Builder!</h1>
              <h2 className='text-textFadeBlack text-[16px] font-[400] laptop:pr-[3.5rem]'>Tired of staring at a fridge full of ingredients with no idea what to make for dinner? Look no further than our ingredient-based recipe builder!</h2>
            </div>
            {/* </div> */}
            <div className='col-span-1 flex justify-center items-center'>
              <div className='laptop:w-[25rem] sm:w-[15rem] w-[18rem] laptop:h-[25rem] sm:h-[15rem] h-[13rem]'>
                <img src='https://firebasestorage.googleapis.com/v0/b/firestore-328db.appspot.com/o/webimages%2Ffeat2.png?alt=media&token=138bda65-7295-4481-85e5-f110a54c54c7' alt='landingimg' className='w-full h-full object-cover rounded-[2rem]' />
              </div>
            </div>
          </div>
        </div>

        <div className='pt-2 pb-4'>
          <div className='desktop:w-full w-[90%] sm:min-h-[512px] min-h-auto bg-primary border rounded-[32px] grid sm:grid-cols-2 m-auto items-center py-4'>
            <div className='col-span-1 flex justify-center items-center'>
              <div className='laptop:w-[25rem] sm:w-[15rem] w-[18rem] laptop:h-[25rem] sm:h-[15rem] h-[13rem]'>
                <img src='https://firebasestorage.googleapis.com/v0/b/firestore-328db.appspot.com/o/webimages%2Ffeat3.png?alt=media&token=a451018c-0523-49b8-a17d-4b7c82e7d4ac' className='w-full h-full object-cover rounded-[2rem]' />
              </div>
            </div>
            <div>
              <div className='col-span-1 p-[2rem]'>
                <h1 className=' text-textMainBlack font-[600] sm:text-[28px] text-[1rem]'>Elevate your cooking with a single snap</h1>
                <h2 className='text-textFadeBlack text-[16px] font-[400] sm:pr-[3.5rem]'>Scan recipe ingredients and let us do the work for you, unlock a world of delicious possibilities.</h2>
              </div>
            </div>
          </div>
        </div>

      </div>



      <LandingFooter />
    </div>
  )
}

export default Landing
