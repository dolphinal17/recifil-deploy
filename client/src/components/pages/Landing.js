import React, {useState} from 'react'
// import { useEffect, useState } from 'react';
// import axios from 'axios';
import { LandingNavbar, LandingFooter } from '../organisms/organisms.js'
import { Link } from 'react-router-dom'
import Asset from '../../assets/asset1.png'
import Waves2 from '../../assets/waves2.svg'
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

  const fqa = [
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
  ]

  return (
    <div className={`w-full flex flex-col justify-start items-center bg-[#181818] relative`}>
      <LandingNavbar />

      <div className='w-full bg-[#181818] flex flex-col relative'>
        <div className='flex flex-col justify-center items-center gap-4 mt-32'>
          <p className={`text-3xl tablet:text-5xl font-bold text-white leading-10`}>A Filipino <span className='text-secondary'>Recipe Builder</span></p>

          <p className={`text-lg tablet:text-xl font-normal tablet:font-medium text-white`}>Discover your inner Filipino, with our app.</p>

          <Link to='/login' className={`mt-4`}>
            <a href="#_" className="relative inline-block text-lg group">
              <span className="relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight text-white transition-colors duration-300 ease-out border-2 border-secondary rounded-lg group-hover:text-mainBlack group-hover:border-white">
              <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-secondary"></span>

              <span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-white group-hover:-rotate-180 ease"></span>
              <span className="relative">Get Started</span>
              </span>

              <span className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0" data-rounded="rounded-lg"></span>
            </a>
          </Link>
        </div>

        <img src={Asset} className='mt-16 mb-6'/>
        <div className='gradient_div w-full h-[551px] absolute bottom-0 opacity-60'></div>
      </div>

      <div className={`w-full max-w-[64rem] flex flex-col items-start justify-start bg-transparent py-[1rem] laptop:pt-[2rem] px-[1rem] desktop:px-0 relative`}>
        {/* about */}
        <div className='w-full flex tablet:flex-row tablet:gap-0 justify-between items-center px-[1rem] tablet:px-0 flex-col-reverse'>
          <div className='flex flex-col'>
            <span className='text-3xl tablet:text-5xl font-bold text-zinc-200'>Entusiasm to food.</span>

            <p className='text-base tablet:text-lg font-normal text-zinc-400 mt-1 tablet:mt-2'>Bring excitement on learning.</p>

            <p className='text-base tablet:text-lg font-normal text-zinc-400 mt-6 tablet:mt-12 max-w-[600px]'>Founded in 2022, ReciFil goal to introduce Filipino food to the masses. By introducing, it will attract those who are interested on enhancing there skill on cooking.</p>
          </div>

          <img src={DropFood} className='w-[300px] md:w-[400px] object-cover'/>
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
