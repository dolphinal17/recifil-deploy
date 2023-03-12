import React, { Fragment, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { Menu, Transition } from '@headlessui/react';
import { Link } from 'react-router-dom';
import { ModalLogout } from './molecules.js';

export default function DropdownProfile() {
    const [openModal, setOpenModal] = useState(false)

  return (
    <div>
        <ModalLogout onOpen={openModal} onClose={() => setOpenModal(false)}/>

        <Menu as="div" className='relative z-10'>
            {({open}) => (
                <Fragment>
                    <Menu.Button as="img" src="https://i.pinimg.com/564x/25/65/46/25654639ef43d6cd59e062bc2cec1a2c.jpg" className='w-[1.25rem] h-[1.25rem] tablet:w-[35px] tablet:h-[35px] rounded-full object-cover cursor-pointer' />

                    <Transition 
                        show={open}
                        enter='transform transition duration-100 ease-in'
                        enterFrom='opacity-0 scale-95'
                        enterTo='opacity-100 scale-100'
                        leave='transform transition duration-75 ease-out'
                        leaveFrom='opacity-100 scale-100'
                        leaveTo='opacity-0 scale-95'
                    >
                        <Menu.Items className='w-[12.5rem] tablet:w-[18.75rem] flex flex-col bg-primary rounded-sm shadow-lg absolute origin-top-right right-0 mt-2 ring-1 ring-black ring-opacity-5 focus:outline-none'>
                            {/* profile */}
                            <Link to="/profile"><Menu.Item>
                                {({active}) => (
                                    <div className={`group flex gap-[0.5rem] p-[0.5rem] items-center cursor-pointer
                                        ${active ? "bg-green-400" : ""}
                                    `}>
                                        <img src='https://i.pinimg.com/564x/25/65/46/25654639ef43d6cd59e062bc2cec1a2c.jpg' className='w-[2rem] w-[2rem] tablet:w-[3rem] tablet:h-[3rem] object-cover rounded-full'></img>

                                        {/* name and arrow*/}
                                        <div className='w-full flex justify-between items-center'>
                                            <div className='flex flex-col gap-[0.125rem]'>
                                                <span className={`text-sm tablet:text-base font-normal laptop:font-medium
                                                    ${active ? "text-primary" : "text-mainBlack"}
                                                `}>Sample Name</span>

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
                                        ${active ? "bg-green-400" : ""}
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