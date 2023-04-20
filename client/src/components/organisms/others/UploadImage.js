import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, {useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { db, storage} from '../../../config/firebase'
import { useAuth } from '../../../context/UserAuthContext'
import { doc, setDoc } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { updateProfile } from 'firebase/auth'





export default function UploadImage() {

    const {currentuser} = useAuth()
    const [photoURL, setPhotoURL] = useState("https://i.pinimg.com/564x/25/65/46/25654639ef43d6cd59e062bc2cec1a2c.jpg")
    const [photo, setPhoto] = useState(null)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()


    async function upload(file, currentuser, setLoading) {
        const fileRef = ref(storage, 'profileimages/'+currentuser.uid +'.jpg');
      
        setLoading(true);
        const snapshot = await uploadBytes(fileRef, file);
      
        const photoURL = await getDownloadURL(fileRef)
      
        updateProfile(currentuser, {photoURL});
      
        setLoading(false);
        
        window.location.reload(true)
      }

    function handleChange(e) {
       if (e.target.files[0]) {
        setPhoto(e.target.files[0])
       } 
       else {
        setPhotoURL("https://firebasestorage.googleapis.com/v0/b/recifil.appspot.com/o/webimages%2Fdefault.jpg?alt=media&token=86cea402-148b-4303-bcec-3fba92f3a7b5")
       }
    }

    function handleClick() {
        if (photo) {
        upload(photo, currentuser, setLoading)
        // navigate('/upload')
    } else {
            setPhotoURL("https://firebasestorage.googleapis.com/v0/b/recifil.appspot.com/o/webimages%2Fdefault.jpg?alt=media&token=86cea402-148b-4303-bcec-3fba92f3a7b5")
        }
    }

    useEffect(() => {
        if (currentuser) {
          if (currentuser.photoURL) {
            setPhotoURL(currentuser.photoURL);
            const userinforef = doc(db, "userinfo", currentuser.uid);
            setDoc(userinforef, { photoURL: currentuser.photoURL }, { merge: true });
          } else {
            const defaultAvatarURL = "https://firebasestorage.googleapis.com/v0/b/recifil.appspot.com/o/webimages%2Fdefault.jpg?alt=media&token=86cea402-148b-4303-bcec-3fba92f3a7b5";
            setPhotoURL(defaultAvatarURL);
            const userinforef = doc(db, "userinfo", currentuser.uid);
            setDoc(userinforef, { photoURL: defaultAvatarURL }, { merge: true });
          }
        }
      }, [currentuser]);

  return (
    <div className='w-full h-screen flex justify-center items-center bg-primary'>
        <div className='max-w-[32rem] w-full bg-primary rounded-lg shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)]'>
            <div className='flex flex-col p-[1rem]'>
                <div className='flex flex-row justify-center items-center'>
                    <span className='text-center text-base tablet:text-xl font-normal text-mainBlack'>Change Avatar</span>
                    
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
                <Link to='/discover'><button className='p-2 bg-slate-100 text-black border-2 mt-3 border-black'>Skip</button></Link>
            </div>
        </div>
    </div>
  )
}