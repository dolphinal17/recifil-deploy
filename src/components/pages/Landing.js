import React, { useEffect } from 'react'
import styles from '../../style'
import { LandingNavbar, LandingFooter } from '../organisms/organisms.js'
import Image1 from '../../assets/image1.png'
import { useAuth } from '../../context/UserAuthContext'
import { Link, useNavigate } from 'react-router-dom'

const Landing = () => {

  const {currentuser} = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (currentuser) {
      navigate('/discover');
    }
  }, [currentuser, navigate]);

  return (
    <div className={`${styles.boxWidth}`}>
      <div className='w-full bg-primary grid-cols-1 gap-[2rem] pb-[2rem]'>
        <LandingNavbar />

        <div className='desktop:w-[65rem] laptop:w-[58rem] sm:w-[35rem] w-[20rem] laptop:h-[512px] h-auto border-solid border-[1px] rounded-t-[2rem] shadow-[5px_0_10px_rgb(0,0,0,0.1)] m-auto flex flex-col'>
          <div className='flex w-[80%] m-auto py-10'>
            <div className='w-[60%]'>
              <h1 className='laptop:text-[48px] sm:text-[24px] text-[18px] text-textMainBlack font-[600]'>An AI Filipino <span className='text-[#59981A]'> Recipe Builder</span></h1>
              <h2 className='laptop:text-[32px] talet:text-[18px] text-[15px] font-[400] text-textMainBlack'>Discover your inner Filipino, with our app.</h2>
            </div>

            <div className='m-auto'>
              <img src={Image1} className='latop:w-[270px] sm:w-[230px] w-[180px] laptop:h-[336px] sm:h-[250px] h-[150px]'/>
            </div>
          </div>

          <div className='w-full h-[4rem] sm:px-[2rem] px-[1rem] bg-bgColorTwo flex justify-between items-center'>
            <div className=''>
                <h1 className='laptop:text-[24px] sm:text-[15px] text-[10px] font-[400] text-primary'>Explore Trending recipe on <span className='text-secondary'> ReciFil</span></h1>
            </div>

            <div className='flex justify-between items-center sm:gap-4 gap-1 '>
                <div>
                    <h1 className='laptop:text-[18px] sm:text-[14px] text-[10px] text-primary font-[400]'>Let's get started</h1>
                </div>
                
                <div className='flex items-center'>
                    <Link to='/login'><button className='laptop:text-[18px] sm:text-[14px] text-[10px] text-primary font-[400] laptop:w-[146px] sm:w-[100px] w-[50px] laptop:h-[49px] sm:h-[30px] h-[20px] rounded-[10px] bg-gradient-to-r from-secondary to-[#59981A]'>Start</button></Link>
                </div>
            </div>
          </div>
        </div>
      </div>

      <div className={`${styles.container}`}>
        <div className='flex flex-col items-center laptop:max-w-[42rem] sm:max-w-[38rem] max-w-[20rem] m-auto pb-5 gap-[1rem]'>
          <h2 className='text-[14px] text-primary font-[500] border bg-fadeText w-[115px] h-[34px] rounded-[5px] flex justify-center items-center'>THE SOLUTION</h2>
          <h1 className='sm:text-[32px] text-[24px] font-[600] text-center text-textMainBlack'>"Experience the taste of the Philippines with our app's exciting features”</h1>
        </div>

        <div className='py-2'>
          <div className='desktop:w-full w-[90%] sm:min-h-[512px] min-h-auto bg-primary border rounded-[32px] grid sm:grid-cols-2 m-auto items-center py-4'>
              <div className='col-span-1 flex justify-center items-center'>
                  <div className='laptop:w-[25rem] sm:w-[15rem] w-[18rem] laptop:h-[25rem] sm:h-[15rem] h-[13rem]'>
                      <img src='https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg' className='w-full h-full object-cover rounded-[2rem]'/>
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
                  <div className='col-span-1 p-[2rem]'>
                      <h1 className=' text-textMainBlack font-[600] sm:text-[28px] text-[1rem]'>Create Culinary Magic with Our Ingredient-Based Recipe Builder!</h1>
                      <h2 className='text-textFadeBlack text-[16px] font-[400] sm:pr-[3.5rem]'>Tired of staring at a fridge full of ingredients with no idea what to make for dinner? Look no further than our ingredient-based recipe builder!</h2>
                  </div>
              {/* </div> */}
              <div className='col-span-1 flex justify-center items-center'>
                  <div className='laptop:w-[25rem] sm:w-[15rem] w-[18rem] laptop:h-[25rem] sm:h-[15rem] h-[13rem]'>
                      <img src='https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg' className='w-full h-full object-cover rounded-[2rem]'/>
                  </div>
              </div>
          </div>
        </div>

        <div className='py-2'>
          <div className='desktop:w-full w-[90%] sm:min-h-[512px] min-h-auto bg-primary border rounded-[32px] grid sm:grid-cols-2 m-auto items-center py-4'>
            <div className='col-span-1 flex justify-center items-center'>
                <div className='laptop:w-[25rem] sm:w-[15rem] w-[18rem] laptop:h-[25rem] sm:h-[15rem] h-[13rem]'>
                    <img src='https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg' className='w-full h-full object-cover rounded-[2rem]'/>
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

      <div className='w-full flex flex-col justify-start items-center bg-[#20262E] py-[1rem] laptop:py-[2rem]'>
        <div className='w-full max-w-[64rem]'>
          <div className='flex justify-center mb-4'>
            <h1 className='laptop:text-[2rem] sm:text-[28px] text-[15px] font-[600] text-primary'><span className='text-transparent bg-clip-text bg-gradient-to-r from-[#B2D33D] to-[#59981A]'>Connect with us</span> and explore <span className='text-transparent bg-clip-text bg-gradient-to-r from-[#B2D33D] to-[#59981A]'>more features</span></h1>
          </div>

          <div className='sm:flex justify-center gap-2'>
            <div className='w-full laptop:max-w-[24rem] sm:max-w-[16rem] max-w-[20rem] bg-[#D9D9D9] rounded-[2rem] flex flex-col items-center sm:m-0 mx-auto pt-5 mb-3'>
              <div className='w-[8rem] h-[2rem] bg-textFadeBlack rounded-[0.5rem] flex justify-center items-center mb-5'>
                <h1 className='text-[1rem] font-[500] text-primary'>Socialize</h1>
              </div>

              <div className='laptop:w-[16rem] w-[12rem] h-[18rem] bg-textFadeBlack rounded-t-[0.5rem] flex justify-center items-center'>
              </div>
            </div>

            <div className='w-full laptop:max-w-[24rem] sm:max-w-[16rem] max-w-[20rem] bg-[#D9D9D9] rounded-[2rem] flex flex-col items-center sm:m-0 m-auto pt-5'>
              <div className='w-[8rem] h-[2rem] bg-textFadeBlack rounded-[0.5rem] flex justify-center items-center mb-5'>
                <h1 className='text-[1rem] font-[500] text-primary'>Build</h1>
              </div>

              <div className='laptop:w-[16rem] w-[12rem] h-[18rem] bg-textFadeBlack rounded-t-[0.5rem] flex justify-center items-center'>
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
