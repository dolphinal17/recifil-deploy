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
            <div className='p-[2rem] flex flex-col gap-[1rem] tablet:gap-[2rem] bg-primary rounded-md border-2 border-green-300'>
                <span className='text-xs tablet:text-sm font-light tablet:font-normal text-mainBlack'>Are you sure, you want to logout?</span>

                <div className='flex justify-end items-center gap-[0.5rem] tablet:gap-[1rem]'>
                    <button onClick={onClose} className='flex justify-center items-center w-[4rem] h-[2rem] text-sm font-light tablet:font-normal text-secondary bg-slate-100 rounded-md'>Cancel</button>

                    <button onClick={handleLogout} className='flex justify-center items-center w-[4rem] h-[2rem] text-sm font-light tablet:font-normal text-primary bg-secondary rounded-md'>Logout</button>
                </div>
            </div>
        </div>
    </div>
  )
}