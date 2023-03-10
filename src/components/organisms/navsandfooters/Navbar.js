import React from 'react';
import Logo from '../../../assets/recifil-logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faMagnifyingGlass, faBook, faBasketShopping, faUsers, faHeart } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { BtnLogout } from '../../atoms/atoms.js';


const Navbar = () => {

  return (
    <nav className='w-full relative'>
      <div className='flex justify-center bg-secondary'> 
        <div className='max-w-[80rem] w-full flex justify-between p-[1rem]'> 
          <div className='flex flex-row items-center'>
              <img src={Logo} className='w-[3.75rem] ml-1' />
              <h4 className='text-primary text-[20px] font-[500] mx-1'>ReciFil</h4>
          </div>
          <div className='flex flex-row items-center'>
              <FontAwesomeIcon icon={faBell} className='mr-5 text-primary text-[20px]' />
                <img src="https://i.pinimg.com/564x/25/65/46/25654639ef43d6cd59e062bc2cec1a2c.jpg" className='w-[35px] h-[35px] rounded-full object-cover' />
              <BtnLogout />
          </div>
        </div>
      </div>

      <div className='flex justify-center bg-primary shadow-md shadow-bottom'>
        <div className='max-w-[80rem] w-full'>

          <ul className='flex justify-center gap-[2rem] laptop:gap-[4rem] px-[2rem] laptop:px-[4rem] py-[0.5rem]'>
            <Link to='/discover'><li className='flex items-center gap-[0.5rem]'><FontAwesomeIcon icon={faMagnifyingGlass} className='text-base text-secondary'/><span className='text-base font-medium text-fadeBlack hidden sm:block'>Discover</span></li></Link>

            <Link to='/library'><li className='flex items-center gap-[0.5rem]'><FontAwesomeIcon icon={faBook} className='text-base text-secondary'/><span className='text-base font-medium text-fadeBlack hidden sm:block'>Library</span></li></Link>

            <Link to='/basket'><li className='flex items-center gap-[0.5rem]'><FontAwesomeIcon icon={faBasketShopping} className='text-base text-secondary'/><span className='text-base font-medium text-fadeBlack hidden sm:block'>Basket</span></li></Link>

            <Link to='/favorites'><li className='flex items-center gap-[0.5rem]'><FontAwesomeIcon icon={faHeart} className='text-base text-secondary'/><span className='text-base font-medium text-fadeBlack hidden sm:block'>Favorites</span></li></Link>

            <Link to='/socials'><li className='flex items-center gap-[0.5rem]'><FontAwesomeIcon icon={faUsers} className='text-base text-secondary'/><span className='text-base font-medium text-fadeBlack hidden sm:block'>Socials</span></li></Link>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar