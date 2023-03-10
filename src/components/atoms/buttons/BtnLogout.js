import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/UserAuthContext';


const BtnLogout = () => {

    const { logout } = useAuth();
    const navigate = useNavigate();

    async function handleLogout() {
        await logout();
        navigate('/login')
    }

  return (
    <button 
        className='text-[#B2D33D] w-[5rem] h-[2.5rem] ml-[2rem] font-[500] rounded-md bg-white'
        type='button'
        onClick={handleLogout}
    >Log Out</button>
  )
}

export default BtnLogout