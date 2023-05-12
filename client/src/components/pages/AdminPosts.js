import React, {useState} from 'react'
import { NavbarAdmin, SidebarAdmin, TablePosts, TablePostsSec, TablePostsThird } from '../organisms/organisms.js'
import { Link } from 'react-router-dom'


export default function AdminPosts() {
  const [toggleState, setToggleState] = useState(1)

  // toggle button
  const toggleTab = (index) => {
    setToggleState(index);
  }
  return (  
    <div className='h-screen w-full bg-green-400 relative'>
      <div className='flex'>
            <SidebarAdmin/>

            <div className='w-full flex flex-1 flex-col'>
                <NavbarAdmin/>
                
                <div className='bg-bgColor h-full p-[1rem]'>
                  <div className='flex justify-between items-center mb-[1.5rem]'>
                    <h1 className='text-xl font-medium text-mainBlack'>Manage Posts</h1>

                    <div className='flex gap-2 items-center'>
                        <button onClick={() => toggleTab(1)} className={`${toggleState === 1 ? "text-primary bg-secondary " : "border border-zinc-400 text-zinc-400" } w-[100px] py-1 rounded-md text-sm`}>Pending</button>

                        <button onClick={() => toggleTab(2)} className={`${toggleState === 2 ? "text-primary bg-secondary " : "border border-zinc-400 text-zinc-400" } w-[100px] py-1 rounded-md text-sm`}>Approved</button>

                        <button onClick={() => toggleTab(3)} className={`${toggleState === 3 ? "text-primary bg-secondary " : "border border-zinc-400 text-zinc-400" } w-[100px] py-1 rounded-md text-sm`}>Archived</button>
                        {/* button here */}
                    </div>
                  </div>

                  <div className={`${toggleState === 1 ? "block" : "hidden"}`}>
                    <TablePosts/>
                  </div>
                  
                  <div className={`${toggleState === 2 ? "block" : "hidden"}`}>
                    <TablePostsSec/>
                  </div>
                    
                  <div className={`${toggleState === 3 ? "block" : "hidden"}`}>
                    <TablePostsThird/>
                  </div>
                </div>
            </div>
        </div>

        {/* <NavbarAdmin/>
        <div className='flex flex-row'>
            <SidebarAdmin />
            
            <TablePosts />
        </div> */}

        {/* <Link to='/pendingposts'><button className='w-[150px] py-1 rounded-md border border-zinc-400 text-zinc-400 text-sm'>Pending Posts</button></Link>
        <Link to='/approvedposts'><button className='w-[150px] py-1 rounded-md border border-zinc-400 text-zinc-400 text-sm'>Approved Posts</button></Link>
        <Link to='/archivedposts'><button className='w-[150px] py-1 rounded-md text-primary bg-secondary text-sm'>Archived Posts</button></Link> */}
    </div>
  ) 
}