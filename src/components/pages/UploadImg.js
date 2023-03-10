import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark} from '@fortawesome/free-solid-svg-icons'
import { useAuth } from '../../context/UserAuthContext'
import { upload } from '../../config/firebase'
import { Link } from 'react-router-dom'



const UploadImg = () => {

    const {currentuser} = useAuth()
    const [photoURL, setPhotoURL] = useState("https://i.pinimg.com/564x/25/65/46/25654639ef43d6cd59e062bc2cec1a2c.jpg")
    const [photo, setPhoto] = useState(null)
    const [loading, setLoading] = useState(false)


    function handleChange(e) {
       if (e.target.files[0]) {
        setPhoto(e.target.files[0])
       }
    }

    function handleClick() {
        upload(photo, currentuser, setLoading)
    }

    useEffect(() => {
        if (currentuser?.photoURL) {
            setPhotoURL(currentuser.photoURL)
        }
    }, [currentuser])

  return (
    <div className='w-full h-[100vh] flex justify-center items-center align-middle border-[#B2D33D]'>
        <div className='sm:w-[440px] w-[340px] h-auto border-solid border-[3px] border-[#B2D33D] rounded-[5px] px-5 py-4 bg-[#FFFFFF]'>
            <div className='flex justify-between items-center'>
              <h1 className='text-[16px] font-[600] text-[#000000]'>Upload your Profile Image</h1>
              {/* <FontAwesomeIcon icon={faXmark} className='text-[16px] font-[500] text-[#949494] cursor-pointer'/> */}
            </div>
            <div className='py-5'>
              <div className='flex justify-center pb-2'>
                <img alt='Profile Image' src={photoURL} className='w-[150px] h-[150px] rounded-[50%]'/>
              </div>
              <div className='flex justify-center'>
                <input className='my-5 border-[1px] border-solid border-black' type="file" onChange={handleChange} />
              </div>
              
              <div className='flex justify-center'>
                <button 
                    className='w-[150px] h-[36px] border-black border-solid border-[1px] rounded-[3px] text-[14px] text-[#black] font-[400] mt-4'
                    onClick={handleClick}
                    disabled={loading || !photo}
                >Change</button>
              </div>
            </div>

            <div className='text-right'> 
                <Link to='/discover'><button className='text-[1rem] bg-none hover:bg-gray-300 p-2'>Next</button></Link>
            </div>
            
        </div>
    </div>
  )
}

export default UploadImg