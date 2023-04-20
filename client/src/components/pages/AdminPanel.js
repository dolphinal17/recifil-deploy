import React from 'react'
import { NavbarAdmin, SidebarAdmin } from '../organisms/organisms.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAppleWhole, faBookOpen, faNoteSticky, faUserGroup } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'



export default function () {
  return (
    <div>
      <NavbarAdmin />
      <div className='flex flex-row'>
        <SidebarAdmin />

        <div className='flex flex-row justify-between items-center flex-wrap mx-[5rem]'>

          <Link to="/adminuser">
            <div className="w-[17rem] h-[14rem] flex flex-col justify-center items-center bg-[#84cc16] shadow-md rounded-md p-4 mx-[3rem]">
              <h2 className="text-xl font-semibold text-white mb-4">Users</h2>
              <FontAwesomeIcon icon={faUserGroup} className='text-white text-[30px]' />
            </div>
          </Link>

          <Link to='/adminposts'><div className="w-[17rem] h-[14rem] flex flex-col justify-center items-center bg-[#84cc16] shadow-md rounded-md p-4 mx-[3rem]">
            <h2 className="text-xl font-semibold text-white mb-4">Posts</h2>
            <FontAwesomeIcon icon={faNoteSticky} className='text-white text-[30px]' />
          </div></Link>

          <Link to='/adminrecipes'><div className="w-[17rem] h-[14rem] flex flex-col justify-center items-center bg-[#84cc16] shadow-md rounded-md p-4 mx-[3rem]">
            <h2 className="text-xl font-semibold text-white mb-4">Recipes</h2>
            <FontAwesomeIcon icon={faBookOpen} className='text-white text-[30px]' />
          </div>
          </Link>

          <div className="w-[17rem] h-[14rem] flex flex-col justify-center items-center bg-[#84cc16] shadow-md rounded-md p-4 mx-[3rem]">
            <h2 className="text-xl font-semibold text-white mb-4">Ingredients</h2>
            <FontAwesomeIcon icon={faAppleWhole} className='text-white text-[30px]' />
          </div>

        </div>

      </div>

    </div>
  )
}