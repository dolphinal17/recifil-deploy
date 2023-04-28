import React from 'react'
import { NavbarAdmin, SidebarAdmin, TableUser } from '../organisms/organisms.js'

export default function AdminUser() {
  return (  
    <div className='h-screen w-full bg-green-400 relative'>
      <div className='flex'>
            <SidebarAdmin/>

            <div className='w-full flex flex-1 flex-col'>
                <NavbarAdmin/>
                
                <div className='bg-bgColor h-full p-[1rem]'>
                    <div className='flex justify-between items-center mb-[1.5rem]'>
                        <h1 className='text-xl font-medium text-mainBlack'>Manage Users</h1>

                        {/* button here */}
                    </div>

                    <TableUser/>
                </div>
            </div>
        </div>

        {/* <NavbarAdmin/>
        <div className='flex flex-row'>
            <SidebarAdmin />
            
            <TableUser />
        </div> */}
    </div>
  ) 
}
