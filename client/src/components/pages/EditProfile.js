import { useState, useEffect } from 'react';
import { updateProfile } from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db, storage } from '../../config/firebase';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { PreLoader } from '../atoms/atoms';





export default function EditProfile() {

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



    return (
        <div className='flex justify-center items-center h-screen'>
        <form onSubmit={handleUpdateProfile} className='w-[30rem] h-auto flex flex-col gap-3 justify-center items-center bg-primary border-2 border-[#84cc16] rounded-md p-4'>
            <h1 className='text-[1.5rem] my-2 font-[600] '>Edit Profile</h1>
            <div>
                <label htmlFor="firstname">First Name:</label>
                <input type="text" id="firstname" value={firstname} onChange={handleFirstNameChange} className='w-[10rem] border-2 border-black ml-2 p-1' />
            </div>
            <div>
                <label htmlFor="lastname">Last Name:</label>
                <input type="text" id="lastname" value={lastname} onChange={handleLastNameChange} className='w-[10rem] border-2 border-black ml-2 p-1' />
            </div>
            <div className='mt-4 text-center flex flex-col justify-between items-center gap-4'>
                <label htmlFor="photoFile" className='-2'>Profile Photo:</label>
                <input type="file" id="photoFile" accept="image/*" onChange={handlePhotoFileChange}
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
                />
                {photoURL && <img src={photoURL} alt="Profile" className='w-[10rem] h-[10rem] rounded-[50%]' />}
            </div>
                    {/* <div>
                <label htmlFor="newPassword">New Password:</label>
                <input type="password" id="newPassword" value={newPassword} onChange={handleNewPasswordChange} />
                </div> */}
            <button type="submit" disabled={isLoading}
                className='flex p-4 justify-center items-center border border-[#84cc16] py-[0.5rem] mt-[1rem] rounded-md hover:bg-lime-500 hover:text-primary hover:border-lime-500 duration-200 text-sm tablet:text-base font-normal mb-[0.25rem] tablet:mb-[0.5rem]'
            >Update Profile</button>
            {error && <div>{error}</div>}
        </form>
        </div>
    )
}
