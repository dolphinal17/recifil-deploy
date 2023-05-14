import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faBasketShopping, faUsers, faHeart, faGlobe } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation } from 'react-router-dom';
import {DropdownProfile, DropdownNotif}  from '../../molecules/molecules.js'

const Navbar = () => {
  const location = useLocation();
  
  return (
    <nav className='w-full fixed top-0 z-10'>
      <div className='flex justify-center bg-secondary'> 
        <div className='max-w-[80rem] w-full flex justify-between p-[1rem]'> 
          <Link to='/discover'><div className='flex flex-row items-center gap-1'>
          <img src="https://firebasestorage.googleapis.com/v0/b/firestore-328db.appspot.com/o/webimages%2FNewLogoPrimary.png?alt=media&token=177edd6d-7543-4fc2-9cce-d39f3a5218a6" alt='recifillogo' className='w-[1rem] tablet:w-[1.5rem] ml-1' />
              <h4 className='text-primary text-base tablet:text-2xl font-[500] mx-1'>ReciFil</h4>
          </div></Link>
          <div className='flex flex-row items-center gap-[1rem]'>
              {/* <FontAwesomeIcon icon={faBell} className=' text-primary text-base tablet:text-2xl cursor-pointer' /> */}
              <DropdownNotif/>

              <DropdownProfile/>
          </div>
        </div>
      </div>

      <div className='flex justify-center bg-primary shadow-md shadow-bottom'>
        <div className='max-w-[80rem] w-full'>

          <ul className='flex justify-center gap-[2rem] laptop:gap-[4rem] px-[2rem] laptop:px-[4rem] py-[0.5rem]'>
            <Link to='/discover'><li className={`flex items-center gap-[0.5rem] hover:text-secondary ${location.pathname === '/discover' ? 'active text-secondary' : 'text-fadeBlack'}`}><FontAwesomeIcon icon={faGlobe} className='text-base'/><span className={`text-base font-medium hidden sm:block`}>Discover</span></li></Link>

            <Link to='/library'><li className={`flex items-center gap-[0.5rem] hover:text-secondary ${location.pathname === '/library' ? 'active text-secondary' : 'text-fadeBlack'}`}><FontAwesomeIcon icon={faBook} className='text-base'/><span className='text-base font-medium hidden sm:block'>Library</span></li></Link>

            <Link to='/basket'><li className={`flex items-center gap-[0.5rem] hover:text-secondary ${location.pathname === '/basket' ? 'active text-secondary' : 'text-fadeBlack'}`}><FontAwesomeIcon icon={faBasketShopping} className='text-base'/><span className='text-base font-medium hidden sm:block'>Builder</span></li></Link>

            <Link to='/favorites'><li className={`flex items-center gap-[0.5rem] hover:text-secondary ${location.pathname === '/favorites' ? 'active text-secondary' : 'text-fadeBlack'}`}><FontAwesomeIcon icon={faHeart} className='text-base'/><span className='text-base font-medium hidden sm:block'>Favorites</span></li></Link>

            <Link to='/socials'><li className={`flex items-center gap-[0.5rem] hover:text-secondary ${location.pathname === '/socials' ? 'active text-secondary' : 'text-fadeBlack'}`}><FontAwesomeIcon icon={faUsers} className='text-bas'/><span className='text-base font-medium hidden sm:block'>Socials</span></li></Link>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar