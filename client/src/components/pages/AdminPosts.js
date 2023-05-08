import React from 'react'
import { NavbarAdmin, SidebarAdmin, TablePosts } from '../organisms/organisms.js'
import { Link } from 'react-router-dom'


export default function AdminPosts() {
  return (  
    <div className='h-screen w-full bg-green-400 relative'>
      <div className='flex'>
            <SidebarAdmin/>

            <div className='w-full flex flex-1 flex-col'>
                <NavbarAdmin/>
                
                <div className='bg-bgColor h-full p-[1rem]'>
                    <div className='flex flex-row justify-start gap-3 items-center mb-[1.5rem]'>
                        
                        <Link to='/pendingposts'><button className='p-2 rounded-xl border-2 bg-[#84cc16] text-white border-transparent'>Pending Posts</button></Link>
                        <Link to='/approvedposts'><button className='p-2 rounded-xl border-black text-black border-2 hover:bg-[#84cc16] hover:text-white hover:border-transparent'>Approved Posts</button></Link>
                        <Link to='/archivedposts'><button className='p-2 rounded-xl border-black text-black border-2 hover:bg-[#84cc16] hover:text-white hover:border-transparent'>Archived Posts</button></Link>

                        {/* button here */}
                    </div>

                    <TablePosts/>
                </div>
            </div>
        </div>

        {/* <NavbarAdmin/>
        <div className='flex flex-row'>
            <SidebarAdmin />
            
            <TablePosts />
        </div> */}
    </div>
  ) 
}