import React from 'react'
import { NavbarAdmin, SidebarAdmin, Dashboard } from '../organisms/organisms.js'
import { Link } from 'react-router-dom'



export default function () {
  return (
    <div className='h-screen w-full bg-green-400 relative'>
      <div className='flex'>
        <SidebarAdmin/>

        <div className='w-full flex flex-1 flex-col'>
          <NavbarAdmin/>
          
          <div className='bg-bgColor h-full p-[1rem]'>
              <div className='flex justify-between items-center mb-[1.5rem]'>
                  <h1 className='text-xl font-medium text-mainBlack'>Dashboard</h1>

                  {/* button here */}
              </div>

              <Dashboard/>
          </div>
        </div>
      </div>
      {/* <NavbarAdmin />
      <div className='flex flex-row'>
        <SidebarAdmin /> */}

        {/* something deleted here*/}
      {/* </div> */}

    </div>
  )
}