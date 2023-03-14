import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faMagnifyingGlass, faBook, faBasketShopping, faUsers, faHeart, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { BtnLogout } from '../../atoms/atoms.js';
import DropdownProfile from '../../molecules/DropdownProfile.js';



const Navbar = () => {

  return (
    <nav className='w-full relative'>
      <div className='flex justify-center bg-secondary'> 
        <div className='max-w-[80rem] w-full flex justify-between p-[1rem]'> 
          <Link to='/discover'><div className='flex flex-row items-center gap-1'>
          <img src="https://firebasestorage.googleapis.com/v0/b/firestore-328db.appspot.com/o/webimages%2FNewLogoPrimary.png?alt=media&token=177edd6d-7543-4fc2-9cce-d39f3a5218a6" className='w-[1rem] tablet:w-[1.5rem] ml-1' />
              <h4 className='text-primary text-base tablet:text-2xl font-[500] mx-1'>ReciFil</h4>
          </div></Link>
          <div className='flex flex-row items-center gap-[1rem]'>
              <FontAwesomeIcon icon={faBell} className=' text-primary text-base tablet:text-2xl cursor-pointer' />

              <DropdownProfile/>
              
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