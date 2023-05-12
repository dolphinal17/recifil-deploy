import { useState, useEffect } from 'react';
import { updateProfile } from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db, storage } from '../../config/firebase';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { PreLoader } from '../atoms/atoms';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';





export default function EditProfile({ open, onClose }) {

    const navigate = useNavigate();
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [photoURL, setPhotoURL] = useState('');
    const [photoFile, setPhotoFile] = useState(null);
    const [newPassword, setNewPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setFirstName(auth.currentUser.displayName.split(' ')[0] ?? '');
        setLastName(auth.currentUser.displayName.split(' ')[1] ?? '');
        setPhotoURL(auth.currentUser.photoURL ?? '');
    }, []);

    function handleFirstNameChange(event) {
        setFirstName(event.target.value);
    }

    function handleLastNameChange(event) {
        setLastName(event.target.value);
    }

    function handlePhotoFileChange(event) {
        const file = event.target.files[0];
        setPhotoFile(file);
        setPhotoURL(URL.createObjectURL(file));
    }

    function handleNewPasswordChange(event) {
        setNewPassword(event.target.value);
    }


    async function handleUpdateProfile(event) {
        event.preventDefault();
        setIsLoading(true);
        setError(null);



        try {
            if (photoFile) {
                const photoRef = ref(storage, `userinfo/${auth.currentUser.uid}/photo.jpg`);
                await uploadBytes(photoRef, photoFile);
                const photoURL = await getDownloadURL(photoRef);
                await updateProfile(auth.currentUser, { photoURL });
            }

            if (firstname.trim() || lastname.trim()) {
                const displayName = `${firstname.trim()} ${lastname.trim()}`;
                await updateProfile(auth.currentUser, { displayName });
            }

            //   if (newPassword) {
            //     await auth.currentUser.updatePassword(newPassword);
            //   }

            const userRef = doc(db, 'userinfo', auth.currentUser.uid);
            await setDoc(userRef, { firstname, lastname }, { merge: true });

            setIsLoading(false);
            setError(null);
            // show success message or redirect to profile page
            toast.success('Profile Updated')
            navigate('/profile')
        } catch (error) {
            setIsLoading(false);
            setError(error.message);
        }
    }


    if (isLoading) {
        <PreLoader />
    }


    if (!open) return null 
    
    return (
        <div className='min-h-screen w-full flex justify-center items-center fixed z-20 bg-textFadeBlack'>
        <form onClick={(e) => {
            e.stopPropagation()
            }} onSubmit={handleUpdateProfile} className='w-full max-w-[30rem] mx-auto p-[2rem] bg-primary max-h-[calc(100vh_-_2rem)] overflow-auto scrollbar-hide'>
            {/* <div className='w-full flex flex-row justify-between items-center'>
            <h1 className='text-[1.5rem] my-2 font-[600] ml-auto mr-[-2rem]'>Edit Profile</h1>
            <Link to='/profile' className='ml-auto mr-3 cursor-pointer'><FontAwesomeIcon icon={faTimes} /></Link>
            </div> */}
            <div className='flex justify-between items-center'>
                <span className='text-lg tablet:text-xl desktop:text-2xl text-mainBlack font-normal tablet:font-medium'>Edit Profile</span>

                <FontAwesomeIcon onClick={onClose} icon={faXmark} className='text-lg tablet:text-xl text-mainBlack cursor-pointer' />
            </div>

            <div className='mt-4 text-center flex flex-col items-center gap-4'>
                <label htmlFor="photoFile" className='text-base text-mainBlack font-normal'>Profile Photo:</label>

                {photoURL && <img src={photoURL} alt="Profile" className='w-[10rem] h-[10rem] rounded-[50%] object-cover border border-zinc-200' />}

                <input type="file" id="photoFile" accept="image/*" onChange={handlePhotoFileChange}
                    className='
                    w-full
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
                    text-sm'
                />
            </div>

            <div className='mt-4 flex flex-col gap-1'>
                <label htmlFor="firstname" className='flex-none text-sm text-mainBlack font-normal'>First Name:</label>

                <input type="text" id="firstname" value={firstname} onChange={handleFirstNameChange} className='w-full border border-zinc-400 px-2 py-1 text-base text-mainBlack font-normal focus:border-2 focus:border-zinc-400 focus:outline-none'/>
            </div>

            <div className='mt-2 flex flex-col gap-1'>
                <label htmlFor="lastname" className='flex-none text-sm  text-mainBlack font-normal'>Last Name:</label>

                <input type="text" id="lastname" value={lastname} onChange={handleLastNameChange} className='w-full border border-zinc-400 px-2 py-1 text-base text-mainBlack font-normal focus:border-2 focus:border-zinc-400 focus:outline-none'/>
            </div>
                    {/* <div>
                <label htmlFor="newPassword">New Password:</label>
                <input type="password" id="newPassword" value={newPassword} onChange={handleNewPasswordChange} />
                </div> */}
            <button type="submit" disabled={isLoading}
                className='flex p-4 justify-center items-center border border-secondary text-mainBlack py-[0.5rem] mt-[1rem] rounded-md hover:bg-secondary hover:text-primary hover:secondary duration-200 text-sm tablet:text-base font-normal mb-[0.25rem] tablet:mb-[0.5rem] mx-auto'
            >Update Profile</button>
            {error && <div>{error}</div>}
        </form>
        </div>
    )
}
