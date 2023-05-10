import React, { Fragment} from 'react'
import { Menu, Transition } from '@headlessui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';

export default function DropdownNotif() {

  return (
    <div>
        <Menu as="div" className='relative z-10'>
            {({open}) => (
                <Fragment>
                    <Menu.Button as="button"><FontAwesomeIcon icon={faBell} className='text-primary text-base tablet:text-2xl cursor-pointer'/></Menu.Button>
                    
                    <Transition 
                        show={open}
                        enter='transform transition duration-100 ease-in'
                        enterFrom='opacity-0 scale-95'
                        enterTo='opacity-100 scale-100'
                        leave='transform transition duration-75 ease-out'
                        leaveFrom='opacity-100 scale-100'
                        leaveTo='opacity-0 scale-95'
                    >
                        <Menu.Items className='w-[16rem] tablet:w-[18.75rem] flex flex-col rounded-sm shadow-lg absolute origin-top-right right-0 mt-2 ring-1 ring-black ring-opacity-5 focus:outline-none bg-zinc-100 py-[0.5rem] max-h-[400px] overflow-auto scrollbar-hide'>
                            <span className='text-lg tablet:text-xl text-fadeBlack ml-[0.5rem] font-medium mb-[0.5rem] tablet:mb-[1rem]'>Notifications</span>

                            <div className='w-full px-[0.125rem] tablet:px-[0.25rem] flex flex-col gap-[2px]'>
                                <Menu.Item>
                                    <div className='p-2 bg-primary rounded-sm cursor-pointer'>                           
                                        <h1 className='text-sm tablet:text-base text-secondary font-normal'>Congratulations!</h1>

                                        <p className='text-sm tablet:text-base text-mainBlack font-normal'>Your post has been approved.</p>
                                    </div>
                                </Menu.Item>
                            </div>
                        </Menu.Items>
                    </Transition>
                </Fragment>  
            )}
        </Menu>
    </div>
  )
}