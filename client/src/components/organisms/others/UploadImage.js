import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, {useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { db, upload } from '../../../config/firebase'
import { useAuth } from '../../../context/UserAuthContext'
import { doc, setDoc } from 'firebase/firestore'




export default function UploadImage() {

    const {currentuser} = useAuth()
    const [photoURL, setPhotoURL] = useState("https://i.pinimg.com/564x/25/65/46/25654639ef43d6cd59e062bc2cec1a2c.jpg")
    const [photo, setPhoto] = useState(null)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()


    function handleChange(e) {
       if (e.target.files[0]) {
        setPhoto(e.target.files[0])
       }
    }

    function handleClick() {
        upload(photo, currentuser, setLoading)
        // navigate('/upload')
    }

    useEffect(() => {
        async function updatedPhoto() {     
          if (currentuser?.photoURL) {
              setPhotoURL(currentuser.photoURL) 
              
              const userinforef = doc(db, "userinfo", currentuser.uid)
  
              await setDoc(userinforef, {photoURL: currentuser.photoURL}, {merge: true})
          } else {
            console.log("no photo")
          }
        }
        updatedPhoto();
      }, [currentuser])

  return (
    <div className='w-full h-screen flex justify-center items-center bg-primary'>
        <div className='max-w-[32rem] w-full bg-primary rounded-lg shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)]'>
            <div className='flex flex-col p-[1rem]'>
                <div className='flex flex-row justify-center items-center'>
                    <span className='text-center text-base tablet:text-xl font-normal text-mainBlack'>Change Avatar</span>
                    <Link to='/discover'><FontAwesomeIcon icon={faXmark} className='text-[16px] font-[500] text-[#949494] cursor-pointer left-40 relative'/></Link>
                </div>
                

                <div className='flex justify-center my-6'>
                    <img alt='Profile Image' src={photoURL} className='w-[10rem] h-[10rem] rounded-[50%]'/>
                </div>

                <input 
                type="file" 
                className='
                    flex
                    file:bg-gradient-to-b file:from-lime-500 file:to-lime-600
                    file:px-4 file:py-1 file:m-1
                    file:border-none
                    file:rounded-full
                    file:text-primary
                    file:cursor-pointer
                    font-thin
                    tablet:font-light
                    mx-auto
                    
                    border 
                    border-zinc-300
                    text-mainBlack
                    rounded-full
                    cursor-pointer
                    text-sm
                '
                onChange={handleChange}
                ></input>

                <button 
                className='flex justify-center items-center border border-zinc-400 py-[0.5rem] mt-[1rem] rounded-md hover:bg-lime-500 hover:text-primary hover:border-lime-500 duration-200 text-sm tablet:text-base font-normal'
                onClick={handleClick}
                disabled={loading || !photo}
                >Change</button>
            </div>
        </div>
    </div>
  )
}