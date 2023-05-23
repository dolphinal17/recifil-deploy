import React, {useState} from 'react'
// import { useEffect, useState } from 'react';
// import axios from 'axios';
import styles from '../../style'
import { LandingNavbar, LandingFooter } from '../organisms/organisms.js'
import { Link } from 'react-router-dom'
import BG1 from '../../assets/asset-2.png'
import Waves from '../../assets/wavesOpacity.svg'
import Waves2 from '../../assets/wavesOpacity2.svg'
import DropFood from '../../assets/dropfood.png'
import { FQA } from '../molecules/molecules.js'

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

  const [fqa, setFqa ] = useState([
    {
      question: "Do you have recipes for vegetarians?",
      answer: "Yes, we have a variety of vegetarian and vegan recipes available on our website. Simply use the basket function and filter out meats and filter in only vegetable ingredients or browse our recipe categories to find them."
    },
    {
      question: "Can I make substitutions in your recipes?",
      answer: "Yes, you can make substitutions in our recipes to suit your preferences or dietary needs. We include variations and suggestions in our recipe instructions to help you make substitutions. However, keep in mind that changing ingredients or amounts may affect the taste or texture of the final dish."
    },
    {
      question: "Can I use your recipes for commercial purposes?",
      answer: "No, our recipes are for personal use only and may not be used for commercial purposes without our permission. If you're interested in using our recipes for a commercial venture, please contact us to discuss licensing options."
    },
  ])
  return (
    <div className={`w-full min-h-screen flex flex-col justify-start items-center bg-bgColorTwo relative scrollbar-thin scrollbar-thumb-[#B2D33D] scrollbar-thumb-rounded-full scrollbar-track-[#B1B1B1] scrollbar-track-rounded-full`}>
      <div className='w-full bg-primary laptop:min-h-screen relative flex flex-col tablet:flex-row items-center'>
        <LandingNavbar />

        <img className='tablet:absolute top-0 right-0 object-cover w-[300px] tablet:w-[700px] mb-2 tablet:mb-0' src={BG1}/>
        {/* shadow-[5px_0_10px_rgb(0,0,0,0.1)] */}
        {/* <div className='desktop:w-[65rem] laptop:w-[58rem] tablet:w-[43rem] sm:w-[35rem] w-[20rem] laptop:h-[512px] h-auto border border-zinc-300 rounded-t-[2rem] m-auto flex flex-col'>
          <div className='tablet:flex-row flex-col flex tablet:w-[80%] w-[100%] m-auto py-10 gap-[1rem]'>
            <div className='tablet:w-[60%] w-[100%] flex flex-col items-center'>
              <h1 className='text-2xl laptop:text-5xl text-textMainBlack font-medium tablet:font-semibold'>A Filipino  <span className='text-[#59981A]'> Recipe Builder</span></h1>
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
        </div> */}
        <div className='flex flex-col gap-3 tablet:gap-6 tablet:ml-12 mb-4 tablet:mb-0'>
          <div className='max-w-[400px] flex flex-col gap-1'>
            <p className='text-2xl tablet:text-3xl laptop:text-5xl font-bold text-mainBlack'>A Filipino <span className='text-secondary'>Recipe Builder</span></p>

            <p className='text-base laptop:text-3xl font-normal tablet:font-medium text-textMainBlack '>Discover your inner Filipino, with our app.</p>
          </div>


          <Link to='/login'><a href="#" class="relative px-10 py-3 font-medium text-white transition duration-300 bg-bgColorTwo rounded-md hover:bg-secondary ease">
            <span class="absolute bottom-0 left-0 h-full -ml-2">
              <svg viewBox="0 0 487 487" class="w-auto h-full opacity-100 object-stretch" xmlns="http://www.w3.org/2000/svg"><path d="M0 .3c67 2.1 134.1 4.3 186.3 37 52.2 32.7 89.6 95.8 112.8 150.6 23.2 54.8 32.3 101.4 61.2 149.9 28.9 48.4 77.7 98.8 126.4 149.2H0V.3z" fill="#FFF" fill-rule="nonzero" fill-opacity=".1"></path></svg>
            </span>

            <span class="absolute top-0 right-0 w-12 h-full -mr-3">
              <svg viewBox="0 0 487 487" class="object-cover w-full h-full" xmlns="http://www.w3.org/2000/svg"><path d="M487 486.7c-66.1-3.6-132.3-7.3-186.3-37s-95.9-85.3-126.2-137.2c-30.4-51.8-49.3-99.9-76.5-151.4C70.9 109.6 35.6 54.8.3 0H487v486.7z" fill="#FFF" fill-rule="nonzero" fill-opacity=".1"></path></svg>
            </span>

            <span class="relative">Get Started</span>
          </a></Link>
        </div>
      </div>
      <img src={Waves} className='w-full h-[50px]'/>
      <div className={`w-full max-w-[64rem] flex flex-col items-start justify-start bg-transparent py-[1rem] laptop:pt-[2rem] laptop:px-[1rem] desktop:px-0 relative`}>
        {/* about */}
        <div className='w-full flex tablet:flex-row tablet:gap-0 justify-between items-center px-[1rem] tablet:px-0 flex-col-reverse'>
          <div className='flex flex-col'>
            <span className='text-3xl tablet:text-5xl font-bold text-zinc-200'>Entusiasm to food.</span>

            <p className='text-base tablet:text-lg font-normal text-zinc-400 mt-1 tablet:mt-2'>Bring excitement on learning.</p>

            <p className='text-base tablet:text-lg font-normal text-zinc-400 mt-6 tablet:mt-12 max-w-[600px]'>Founded in 2022, ReciFil goal to introduce Filipino food to the masses, By introducing, it will attract those who are interested on enhancing there skill on cooking.</p>
          </div>

          <img src={DropFood} className='w-[400px] object-cover'/>
        </div>
        
        {/* features */}
        <section className='w-full mt-[1rem] tablet:mt-[2rem] pt-[1rem] tablet:pt-[2rem] border-t border-zinc-600 px-[1rem] tablet:px-0'>
          <span className='text-3xl tablet:text-5xl font-bold text-zinc-200'>Frequently Asked Questions (FAQ)</span>

          <p className='text-base tablet:text-lg font-normal text-zinc-400 mt-1 tablet:mt-2'>Here you will find answers to commonly asked questions about our products/services. If you have a specific question that is not addressed here, please feel free to contact us for further assistance.</p>

          <div className='flex flex-col w-full gap-3 tablet:gap-6 mt-[2rem] tablet:mt-[4rem]'>
            {
              fqa.map((item, key) => (
                <FQA key={key} datas={item}/>
              ))
            }
          </div>
        </section>
      </div>
      
      <div className='w-full bg-primary'>
        <img src={Waves2} className='w-full h-[50px]'/>

        <LandingFooter />
      </div>
    </div>
  )
}

export default Landing
