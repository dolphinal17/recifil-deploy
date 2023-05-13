import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faUserGroup, faNoteSticky, faBookOpen, faAppleWhole, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation } from 'react-router-dom';

export default function SidebarAdmin() {
    const [open, setOpen] = useState(true)
    const location = useLocation();
  return (
    <div className={`${open ? "w-[16rem] px-[0.5rem] tablet:px-[1rem]" : "w-[4rem] flex flex-col items-center"} h-screen bg-bgColorTwo py-[0.5rem] tablet:py-[1rem] duration-300 sticky top-0`}>
        {/* minimize sidebar */}
        <div className={`${open ? "justify-end" : "justify-center"} flex mb-[0.5rem] tablet:mb-[1rem]`}>
            <button onClick={() => setOpen(!open)}>
                <FontAwesomeIcon icon={faAngleLeft} className={`${!open && "rotate-180"} text-2xl text-secondary`}/>
            </button>
        </div>

        {/* logo */}
        <div className={`flex items-center justify-center gap-[0.5rem] tablet:gap-[1rem]`}>
            <img src='https://firebasestorage.googleapis.com/v0/b/recifil.appspot.com/o/webimages%2FLogoMainG.png?alt=media&token=c25b6fd5-4217-4b56-af19-4aa6208abcc8' className='w-[1rem] tablet:w-[1.5rem]'></img>

            <span className={`${!open && "hidden"} text-base tablet:text-2xl font-normal tablet:font-medium text-primary duration-200`}>ReciFil</span>
        </div>

        {/* menu */}
        <div className='flex flex-col gap-[0.5rem] tablet:gap-[1rem] mt-[1rem] tablet:mt-[2rem]'>
            {/* title */}
            <span className='text-sm font-normal tablet:font-medium text-fadeBlack'>Menu</span>

            {/* menu list */}
            <ul className={`${open ? "pl-[0.5rem] tablet:pl-[1rem]" : ""} flex flex-col duration-200`}>
                <Link to='/admin'><li className={`${open ? "" : "justify-center"} ${location.pathname === '/admin' ? 'active border-r-[3px] border-secondary text-secondary' : 'text-primary'} hover:text-secondary flex items-center py-[0.25rem] tablet:py-[0.5rem]  cursor-pointer gap-[1rem] tablet:gap-[2rem] duration-200 `}><FontAwesomeIcon icon={faChartLine} className='text-sm w-[14px] '/><span className={`${!open && "hidden"} text-sm font-normal tablet:font-medium duration-200`}>Dashboard</span></li></Link>

                <Link to='/adminuser'><li className={`${open ? "" : "justify-center"} ${location.pathname === '/adminuser' ? 'active border-r-[3px] border-secondary text-secondary' : 'text-primary'} hover:text-secondary flex items-center py-[0.25rem] tablet:py-[0.5rem]  cursor-pointer gap-[1rem] tablet:gap-[2rem] duration-200`}><FontAwesomeIcon icon={faUserGroup} className='text-sm w-[14px]'/><span className={`${!open && "hidden"} text-sm font-normal tablet:font-medium duration-200`}>Users</span></li></Link>

                <Link to='/pendingposts'><li className={`${open ? "" : "justify-center"} ${location.pathname === '/pendingposts' ? 'active border-r-[3px] border-secondary text-secondary' : 'text-primary'} hover:text-secondary flex items-center py-[0.25rem] tablet:py-[0.5rem]  cursor-pointer gap-[1rem] tablet:gap-[2rem] duration-200`}><FontAwesomeIcon icon={faNoteSticky} className='text-sm w-[14px]'/><span className={`${!open && "hidden"} text-sm font-normal tablet:font-medium duration-200`}>Posts</span></li></Link>

                <Link to='/adminrecipes'><li className={`${open ? "" : "justify-center"} ${location.pathname === '/adminrecipes' ? 'active border-r-[3px] border-secondary text-secondary' : 'text-primary'} hover:text-secondary flex items-center py-[0.25rem] tablet:py-[0.5rem]  cursor-pointer gap-[1rem] tablet:gap-[2rem] duration-200`}><FontAwesomeIcon icon={faBookOpen} className='text-sm w-[14px]'/><span className={`${!open && "hidden"} text-sm font-normal tablet:font-medium duration-200`}>Recipes</span></li></Link>

                <Link to='/admining'><li className={`${open ? "" : "justify-center"} ${location.pathname === '/admining' ? 'active border-r-[3px] border-secondary text-secondary' : 'text-primary'} hover:text-secondary flex items-center py-[0.25rem] tablet:py-[0.5rem]  cursor-pointer gap-[1rem] tablet:gap-[2rem] duration-200`}><FontAwesomeIcon icon={faAppleWhole} className='text-sm w-[14px]'/><span className={`${!open && "hidden"} text-sm font-normal tablet:font-medium duration-200`}>Ingredients</span></li></Link>
            </ul>
        </div>

    </div>
  )
}