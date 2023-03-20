import { sendEmailVerification } from 'firebase/auth'
import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../context/UserAuthContext'
import ModalAccountSuccess from './ModalAccountSuccess'


export default function EmailVerificationModal() {

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
          navigate('/success')
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
    <div className='max-w-[32rem] w-full bg-primary rounded-lg shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)]'>
        {/* modal image */}
        <img src='https://firebasestorage.googleapis.com/v0/b/firestore-328db.appspot.com/o/webimages%2Femail.jpg?alt=media&token=a08d6932-79c7-4e21-b721-4e51acfa7732' className='w-full object-cover rounded-t-lg' />

        {/* modal info */}
        <div className='flex flex-col p-[1rem]'>
            {/* modal title */}
            <div className='flex flex-col pb-[0.25rem] tablet:pb-[0.5rem] border-b border-zinc-200 gap-[0.25rem] tablet:gap-[0.5rem]'>
                <span className='text-center text-base tablet:text-2xl font-normal text-mainBlack'>Email Verification</span>

                <p className='text-center text-sm font-thin tablet:font-light text-fadeBlack'>Follow the instruction in email to verify your account.</p>
            </div>

            <div className='flex flex-col sm:flex-row mt-[1rem] tablet:mt-[2rem] gap-[0.5rem] tablet:gap-[1rem] justify-center items-center'>
                <span className='text-sm font-thin tablet:font-light text-mainBlack'>A verication email has been sent to:</span>

                <span className='text-center text-sm font-light tablet:font-normal text-lime-600'>{currentuser?.email}</span>
            </div>

            {time === 0 ? (
              <button
                disabled={disables===true}  
                onClick={resendEmailVerification}
                className='mt-[0.5rem] tablet:mt-[1rem] text-sm tablet:text-base font-normal text-primary bg-lime-600 py-[0.75rem] rounded-md px-[1.5rem] mx-auto'
              >Resend Email </button>
              ) : (
              <button
                disabled={disables===true}  
                onClick={resendEmailVerification}
                className='mt-[0.5rem] tablet:mt-[1rem] text-sm tablet:text-base font-normal text-primary bg-lime-400 py-[0.75rem] rounded-md px-[2rem] mx-auto'
              >Resend Email: {time}</button>
            )} 

        </div>
    </div>
  )
}