import React, { Fragment, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { Menu, Transition } from '@headlessui/react';
import { Link } from 'react-router-dom';
import { ModalLogout } from './molecules.js';
import { useAuth } from '../../context/UserAuthContext.js';

export default function DropdownProfile() {
    const [openModal, setOpenModal] = useState(false)

    const {currentuser} = useAuth()

  return (
    <div>
        <ModalLogout onOpen={openModal} onClose={() => setOpenModal(false)}/>

        <Menu as="div" className='relative z-10'>
            {({open}) => (
                <Fragment>
                    <Menu.Button as="img" src={currentuser?.photoURL || "https://firebasestorage.googleapis.com/v0/b/recifil.appspot.com/o/webimages%2Fdefault.jpg?alt=media&token=86cea402-148b-4303-bcec-3fba92f3a7b5"} className='flex-none w-[1.25rem] h-[1.25rem] tablet:w-[35px] tablet:h-[35px] rounded-[50%] object-cover cursor-pointer' />

                    <Transition 
                        show={open}
                        enter='transform transition duration-100 ease-in'
                        enterFrom='opacity-0 scale-95'
                        enterTo='opacity-100 scale-100'
                        leave='transform transition duration-75 ease-out'
                        leaveFrom='opacity-100 scale-100'
                        leaveTo='opacity-0 scale-95'
                    >
                        <Menu.Items className='w-[16rem] tablet:w-[18.75rem] flex flex-col bg-zinc-50 rounded-sm shadow-lg absolute origin-top-right right-0 mt-2 ring-1 ring-black ring-opacity-5 focus:outline-none'>
                            {/* profile */}
                            <Link to="/profile"><Menu.Item>
                                {({active}) => (
                                    <div className={`group flex gap-[0.5rem] p-[0.5rem] items-center cursor-pointer
                                        ${active ? "bg-lime-500" : ""}
                                    `}>
                                        <img src={currentuser?.photoURL || "https://firebasestorage.googleapis.com/v0/b/recifil.appspot.com/o/webimages%2Fdefault.jpg?alt=media&token=86cea402-148b-4303-bcec-3fba92f3a7b5"} alt='profileimg' className='flex-none w-[2rem] h-[2rem] tablet:w-[3rem] tablet:h-[3rem] object-cover rounded-full'></img>

                                        {/* name and arrow*/}
                                        <div className='w-full flex justify-between items-center'>
                                            <div className='flex flex-col gap-[0.125rem]'>
                                                <span className={`text-sm tablet:text-base font-normal laptop:font-medium
                                                    ${active ? "text-primary" : "text-mainBlack"}
                                                `}>{currentuser?.displayName}</span>

                                                <span className={`text-xs tablet:text-sm font-light laptop:font-normal
                                                    ${active ? "text-primary" : "text-fadeBlack"}
                                                `}>My Profile</span>
                                            </div>

                                            <FontAwesomeIcon icon={faChevronRight} className={`text-base laptop:text-2xl
                                                ${active ? "text-primary" : "text-secondary"}
                                            `}/>
                                        </div>
                                    </div>
                                )}
                            </Menu.Item></Link>

                            <hr className='w-full bg-[#D0D0D0] h-[1px]'/>

                            <Menu.Item>
                                {({active}) => (
                                    <div type='button' onClick={() => setOpenModal(true)} className={`group flex p-[0.5rem] items-center justify-end gap-[0.25rem] laptop:gap-[0.5rem] cursor-pointer
                                        ${active ? "bg-lime-500" : ""}
                                    `}>
                                        <FontAwesomeIcon icon={faArrowRightFromBracket} className={`text-xs tablet:text-sm
                                            ${active ? "text-primary" : "text-secondary"}
                                        `}/>

                                        <span className={`text-xs tablet:text-sm font-normal laptop:font-medium
                                            ${active ? "text-primary" : "text-secondary"}
                                        `}>Logout</span>
                                    </div>
                                )}
                            </Menu.Item>
                        </Menu.Items>
                    </Transition>
                </Fragment>
            )}              
        </Menu>
    </div>
  )
}