import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/UserAuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

const BtnLogout = (props) => {

    const { logout } = useAuth();
    const navigate = useNavigate();

    async function handleLogout() {
        await logout();
        navigate('/login')
    }

  return (
    <FontAwesomeIcon type='button' onClick={handleLogout} icon={faRightFromBracket} classname={props.className}/>
  )
}

export default BtnLogout