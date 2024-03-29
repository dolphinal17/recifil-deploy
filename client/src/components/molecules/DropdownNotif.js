import React, { Fragment, useEffect, useState } from 'react'
import { Menu, Transition } from '@headlessui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { auth, db } from '../../config/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';





export default function DropdownNotif() {

    const [notif, setNotif] = useState([])
    const [hasNewNotif, setHasNewNotif] = useState(false);


    const fetchNotif = async () => {
        const notificationsRef = collection(db, `userinfo/${auth.currentUser.uid}/notifications`);
        const snapshot = await getDocs(notificationsRef);
        const notifications = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        setNotif(notifications);

        if (notif.length < snapshot.docs.length) {
            setHasNewNotif(true);
        }
    }

    useEffect(() => {
        fetchNotif();
    }, [])

    return (
        <div>
            <Menu as="div" className='relative z-10'>
                {({ open }) => (
                    <Fragment>
                        <Menu.Button as="button" onClick={() => setHasNewNotif(false)}>
                            <FontAwesomeIcon icon={faBell} className='text-primary text-base tablet:text-2xl cursor-pointer' />
                            {hasNewNotif && (
                                <span className="absolute top-0 right-0 h-2.5 w-2.5 bg-red-500 rounded-full"></span>
                            )}
                        </Menu.Button>

                        <Transition
                            show={open}
                            enter='transform transition duration-100 ease-in'
                            enterFrom='opacity-0 scale-95'
                            enterTo='opacity-100 scale-100'
                            leave='transform transition duration-75 ease-out'
                            leaveFrom='opacity-100 scale-100'
                            leaveTo='opacity-0 scale-95'
                        >
                            <Menu.Items className='w-[16rem] tablet:w-[22rem] flex flex-col rounded-sm shadow-lg absolute origin-top-right right-0 mt-2 ring-1 ring-black ring-opacity-5 focus:outline-none bg-primary py-[0.5rem] max-h-[400px] overflow-auto scrollbar-hide'>
                                <span className='text-lg tablet:text-xl text-fadeBlack ml-[0.5rem] font-medium mb-[0.5rem] tablet:mb-[1rem]'>Notifications</span>

                                <div className='w-full px-[0.125rem] tablet:px-[0.25rem] flex flex-col gap-[2px]'>
                                    <Menu.Item as='div'>
                                        {notif.map((notif, i) => (
                                            <Link to={notif.profileUrl}>
                                                <div className='flex flex-row w-full bg-primary border-b border-zinc-200'>
                                                    <img src={notif.postimage} className='w-[20%] h-auto object-cover' />
                                                    <div className='p-2 bg-primary rounded-sm cursor-pointer' key={i}>
                                                        <h1 className='text-sm tablet:text-base text-secondary font-normal'>{notif.postname}</h1>
                                                        <p className='text-sm tablet:text-base text-mainBlack font-normal'>{notif.type}</p>
                                                    </div>
                                                </div>
                                            </Link>
                                        ))}

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
