import React, {useEffect, useState} from 'react'
import { useAuth } from '../../context/UserAuthContext'
import {sendEmailVerification} from 'firebase/auth'
import {useNavigate} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMailBulk } from '@fortawesome/free-solid-svg-icons'

function Verify() {

  const {currentuser, logout} = useAuth()
  const [disables, setDisables] = useState(true)
  const [time, setTime] = useState(60)
  const navigate = useNavigate()

  useEffect(() => {
    const interval = setInterval(() => {
      currentuser?.reload()
      .then(() => {
        if(currentuser?.emailVerified){
          clearInterval(interval)
          navigate('/upload')
        }
      })
      .catch((err) => {
        // alert(err.message)
        logout();
        navigate('/signup')
      })
    }, 1000)
  }, [navigate, currentuser])


  useEffect(() => {
    let interval = null
    if(time !== 0 ){
      interval = setInterval(() => {
        setTime((time) => time - 1)
      }, 1000)
      setDisables(true)
    }else if(time === 0){
      clearInterval(interval)   
      setDisables(false)
    }
    return () => clearInterval(interval);
  }, [time])

  const resendEmailVerification = () => {
    sendEmailVerification(currentuser)
    setTime(60)
  }

  return (
    <div className='center flex justify-center items-center h-[100vh]'>
      <div className='verifyEmail w-[90%] max-w-[500px] border-[#B2D33D] border-solid border-4 text-center p-[40px] rounded-lg'>
        <FontAwesomeIcon icon={faMailBulk} className='text-[3rem] text-[#B2D33D] mb-[0.5rem]' />
        <h1 className='font-[300] text-[1.5rem] mt-0 mb-[2rem]'>Verify your Email Address</h1>
        <p className='leading-[25px] mb-[3rem]'> 
          A Verification email has been sent to:<br/>
          <span className='text-[#B2D33D] font-[600] text-[1.2rem]'>{currentuser?.email}</span>
        </p>
        <span className='text-gray-500 mt-[2rem]'>Follow the instruction in the email to verify your account</span>
        {time === 0 ? (
        <button
          disabled={disables===true}  
          onClick={resendEmailVerification}
          className='w-[8rem] bg-[#B2D33D] text-white p-[0.8rem] mt-[1rem] rounded-lg'
        >Resend Email </button>
        ) : (
        <button
          disabled={disables===true}  
          onClick={resendEmailVerification}
          className='w-[10rem] bg-[#cae178] text-white p-[0.8rem] mt-[1rem] rounded-lg'
        >Resend Email: {time}</button>
        )}       
        
      </div>
    </div>
  )
}

export default Verify