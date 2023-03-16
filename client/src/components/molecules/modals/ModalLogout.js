import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/UserAuthContext.js';

export default function ModalLogout({onOpen, onClose}) {
    const { logout } = useAuth();
    const navigate = useNavigate();

    // logout function
    async function handleLogout() {
        await logout();
        navigate('/login')
    }

    if (!onOpen) return null 
  return (
    <div className='bg-textFadeBlack fixed inset-0 z-50'>
        <div className='flex h-screen justify-center items-center'>
            <div className='p-[2rem] flex flex-col gap-[1rem] tablet:gap-[2rem] bg-primary rounded-lg'>
                <span className='text-base tablet:text-xl font-light tablet:font-normal text-mainBlack'>Are you sure, you want to logout?</span>

                <div className='flex justify-center items-center gap-[0.5rem] tablet:gap-[1rem]'>
                <button onClick={onClose} className='flex justify-center items-center px-[1rem] tablet:px-[2rem] py-[0.5rem] tablet:py-[1rem] text-base font-thin tablet:font-light text-mainBlack bg-zinc-200 hover:bg-zinc-400 hover:text-primary rounded-md'>Cancel</button>

                <button onClick={handleLogout} className='flex justify-center items-center px-[1rem] tablet:px-[2rem] py-[0.5rem] tablet:py-[1rem] text-base font-light tablet:font-normal text-primary bg-lime-500 hover:bg-lime-600 rounded-md'>Logout</button>
                </div>
            </div>
        </div>
    </div>
  )
}