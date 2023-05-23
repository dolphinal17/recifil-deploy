import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faXmark } from '@fortawesome/free-solid-svg-icons'
import { db } from '../../../config/firebase';
import { toast } from 'react-toastify';
import { addDoc, collection } from 'firebase/firestore';

export default function ModalAddIngredients({ open, onClose }) {
    


    const [ingname, setIngName] = useState('');
    const [ingcat, setIngCategory] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!ingname || !ingcat) {
            toast.error('Please fill in all fields')
        }

        else {
        try {
           
            const docRef = await addDoc(collection(db, 'ingdata'), {
                ingname,
                ingcat
            });
            toast.success('Ingredient Added!');
            setIngName('');
            setIngCategory('');
            onClose();
        } catch (error) {
            console.error('Error adding ingredient: ', error);
        }
    }
    };

    if (!open) return null

    return (
        <div onClick={onClose} className='w-full flex justify-center items-center fixed z-20'>
            <form
                onClick={(e) => {
                    e.stopPropagation()
                }}
                onSubmit={handleSubmit}
                className='w-full max-w-[30rem] mx-auto p-[2rem] bg-primary max-h-[calc(100vh_-_2rem)] overflow-auto scrollbar-hide border-2 border-zinc-600'>
                <div className='flex justify-between items-center'>
                    <span className='text-lg tablet:text-xl desktop:text-2xl text-mainBlack font-normal tablet:font-medium'>Add Ingredient</span>

                    <FontAwesomeIcon onClick={onClose} icon={faXmark} className='text-lg tablet:text-xl text-mainBlack cursor-pointer' />
                </div>

                {/* inputs */}
                <div className='flex flex-col gap-4 mt-[1rem]'>
                    <div className='flex flex-col gap-2'>
                        <span className='text-base text-mainBlack font-normal'>Name:</span>
                        <input className='w-full px-4 py-2 text-mainBlack text-base border border-zinc-400 font-normal focus:outline-none focus:border-2 focus:border-zinc-600'
                            placeholder='Name'
                            value={ingname}
                            onChange={(e) => setIngName(e.target.value)}
                        ></input>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <span className='text-base text-mainBlack font-normal'>Category:</span>
                        <input className='w-full px-4 py-2 text-mainBlack text-base border border-zinc-400 font-normal focus:outline-none focus:border-2 focus:border-zinc-600'
                            placeholder='Category'
                            value={ingcat}
                            onChange={(e) => setIngCategory(e.target.value)}
                        ></input>
                    </div>
                </div>

                <button
                    className='w-full py-[1rem] text-base font-medium text-primary bg-secondary mt-[0.75rem] rounded-md'
                    type='submit'
                // onClick={() => {
                //     const newIngredients = tempIng.filter((ingredient) => !formData.ingredients.includes(ingredient));
                //     const newSteps = tempSteps.filter((step) => !formData.steps.includes(step));
                //     setFormData((prevFormData) => ({
                //         ...prevFormData,
                //         ingredients: [...prevFormData.ingredients, ...newIngredients],
                //         steps: [...prevFormData.steps, ...newSteps],
                //         image: tempImg,   // Update the formData with the new image URL
                //     }));
                //     // Save formData to Firestore
                // }}
                >
                    Add Ingredient
                </button>
            </form>
        </div>
    )
}
