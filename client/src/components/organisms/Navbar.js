import React from 'react';
import Logo from '../../assets/recifil-logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faMagnifyingGlass, faBook, faBasketShopping, faUsers, faHeart } from '@fortawesome/free-solid-svg-icons';



const Navbar = () => {
  return (
    <div className='w-full'>
      <div className='flex justify-center bg-secondary'> 
        <div className='max-w-[80rem] w-full flex justify-between p-[1rem]'> 
          <div className='flex flex-row items-center'>
              <img src={Logo} className='w-[60px] ml-1' />
              <h4 className='text-primary text-[20px] font-[500] mx-1'>ReciFil</h4>
          </div>
          <div className='flex flex-row items-center'>
              <FontAwesomeIcon icon={faBell} className='mr-5 text-primary text-[20px]' />
              <img src="https://i.pinimg.com/236x/40/c8/81/40c8814b702b8f39a6c7d2eda44242b6.jpg" className='w-[35px] h-[35px] rounded-full object-cover' />
          </div>
        </div>
      </div>

      <div className='flex justify-center bg-primary shadow-md shadow-bottom'>
        <div className='max-w-[80rem] w-full'>
          {/* <ul className='flex justify-evenly items-center flex-row md:my-auto md:mt-2 md:py-0 align-middle gap-[12px] '>
            <li className='text-secondary mx-2 flex flex-row items-center cursor-pointer'><FontAwesomeIcon icon={faMagnifyingGlass} className='mr-2' /><span className='hidden tablet:block'>Discover</span></li>
            <li className='text-secondary mx-2 flex flex-row items-center cursor-pointer'><FontAwesomeIcon icon={faBook} className='mr-2' /><span className='hidden tablet:block'>Library</span></li>
            <li className='text-secondary mx-2 flex flex-row items-center cursor-pointer'><FontAwesomeIcon icon={faBasketShopping} className='mr-2' /><span className='hidden tablet:block'>Basket</span></li>
            <li className='text-secondary mx-2 flex flex-row items-center cursor-pointer'><FontAwesomeIcon icon={faUsers} className='mr-2' /><span className='hidden tablet:block'>Socials</span></li>
            <li className='text-secondary mx-2 flex flex-row items-center cursor-pointer'><FontAwesomeIcon icon={faHeart} className='mr-2' /><span className='hidden tablet:block'>Favorites</span></li>
          </ul> */}

          <ul className='flex justify-center gap-[2rem] laptop:gap-[4rem] px-[2rem] laptop:px-[4rem] py-[0.5rem]'>
            <li className='flex items-center gap-[0.5rem]'><FontAwesomeIcon icon={faMagnifyingGlass} className='text-base text-secondary'/><span className='text-base font-medium text-fadeBlack hidden tablet:block'>Discover</span></li>

            <li className='flex items-center gap-[0.5rem]'><FontAwesomeIcon icon={faBook} className='text-base text-secondary'/><span className='text-base font-medium text-fadeBlack hidden tablet:block'>Libary</span></li>

            <li className='flex items-center gap-[0.5rem]'><FontAwesomeIcon icon={faBasketShopping} className='text-base text-secondary'/><span className='text-base font-medium text-fadeBlack hidden tablet:block'>Basket</span></li>

            <li className='flex items-center gap-[0.5rem]'><FontAwesomeIcon icon={faHeart} className='text-base text-secondary'/><span className='text-base font-medium text-fadeBlack hidden tablet:block'>Favorites</span></li>

            <li className='flex items-center gap-[0.5rem]'><FontAwesomeIcon icon={faUsers} className='text-base text-secondary'/><span className='text-base font-medium text-fadeBlack hidden tablet:block'>Socials</span></li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Navbar