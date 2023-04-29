import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faXmark } from '@fortawesome/free-solid-svg-icons'
import { faImage } from '@fortawesome/free-regular-svg-icons';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { addDoc, collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../../config/firebase';
import { PreLoader } from '../../atoms/atoms';
import { toast } from 'react-toastify'
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';


export default function AddRecipeForm() {



    const [recipe, setRecipe] = useState(null)
    const [loading, setLoading] = useState(false)
    const [tempIng, setTempIng] = useState([]);
    const [tempSteps, setTempSteps] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        desc: '',
        ingredients: [],
        steps: [],
        image: '',
    });

    const [newIngredient, setNewIngredient] = useState('');
    const [newStep, setNewStep] = useState('');
    const [uploadImg, setUploadImg] = useState(null);
    const [tempImg, setTempImg] = useState('');

    const navigate = useNavigate()


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'ingredients') {
            // Split the ingredients by line breaks into an array
            const ingredientsArray = value.split('\n');
            setFormData({ ...formData, ingredients: ingredientsArray });
        }
        else if (name === 'steps') {
            const stepsArray = value.split('\n');
            setFormData({ ...formData, steps: stepsArray });

        } else {
            setFormData({ ...formData, [name]: value });
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // First, upload the recipe image to Firebase Storage
            await handleImageUpload();

            // Then, create a new recipe document in Firestore
            const newRecipe = {
                title: formData.title,
                desc: formData.desc,
                ingredients: formData.ingredients,
                steps: formData.steps,
                image: tempImg || "https://firebasestorage.googleapis.com/v0/b/recifil.appspot.com/o/webimages%2Fno-image-available-icon-flat-vector-no-image-available-icon-flat-vector-illustration-132482953.jpg?alt=media&token=892435a0-ff34-4021-b190-4dc3b435cf37" // Use the tempImg URL if it exists, otherwise use the formData image URL
            };

            const docRef = await addDoc(collection(db, 'recipes'), newRecipe);

            toast.success('Recipe added!');
            navigate('/adminrecipes');
        } catch (error) {
            console.error('Error adding recipe: ', error);
        }
    };


    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            setUploadImg(e.target.files[0]);
        }
    };

    const handleImageUpload = async () => {
        if (!uploadImg) return;

        // Create a storage reference
        const storageRef = ref(getStorage(), `recipeimg/${uploadImg.name}`);

        // Upload the file to the storage reference
        await uploadBytes(storageRef, uploadImg);

        // Get the download URL of the uploaded file
        const downloadURL = await getDownloadURL(storageRef);

        // Update the Firestore document with the download URL
        setTempImg(downloadURL);

    };


    if (loading) {
        return <PreLoader />;
    }


    return (
        <div className='w-full'>
            <form onSubmit={handleSubmit} className='w-full max-w-[30rem] mx-auto p-[2rem] bg-primary'>
                <div className='flex justify-between items-center'>
                    <span className='text-lg tablet:text-xl desktop:text-2xl text-mainBlack font-normal tablet:font-medium'>Edit Recipe</span>

                    <Link to='/adminrecipes'><FontAwesomeIcon icon={faXmark} className='text-lg tablet:text-xl text-mainBlack' /></Link>
                </div>

                {/* inputs */}
                <div className='flex flex-col gap-[0.5rem] mt-[1rem]'>
                    <div className='flex justify-around items-center'>
                        <div className={`w-[4rem] h-[4rem] border border-dashed border-zinc-400 flex flex-none justify-center items-center`}>
                            {tempImg? (<img src={tempImg} className='w-[4rem] h-[4rem] object-cover' />) : (
                                <FontAwesomeIcon icon={faImage} className='text-xl text-fadeBlack' />
                            )}
                            {/* <img src={tempImg} className='w-[4rem] h-[4rem] object-cover' /> */}
                            {/* <FontAwesomeIcon icon={faImage} className='text-xl text-fadeBlack' /> */}
                        </div>

                        <input type="file" accept='.jpg, .jpeg' onChange={handleImageChange} className='border-2 text-[0.7rem] mx-2' />
                        <button type='button' onClick={handleImageUpload} className='w-[rem] bg-[#84cc16] text-white rounded md'>Change Image</button>
                    </div>

                    {/* img and name */}
                    <div className=''>
                        <input
                            className='px-[0.75rem] py-[0.5rem] w-full text-mainBlack text-lg border border-zinc-300 rounded-md focus:outline-zinc-400'
                            placeholder='Recipe Name'
                            type='text'
                            name='title'
                            value={formData.title}
                            onChange={handleInputChange}
                        />
                    </div>

                    {/* description */}
                    <textarea
                        typeof='text' placeholder='About'
                        className='px-[0.75rem] py-[0.5rem] w-full text-mainBlack text-lg border border-zinc-300 min-h-[6rem] resize-none rounded-md'
                        name='desc'
                        value={formData.desc}
                        onChange={handleInputChange}
                    />

                    {/* ingredients */}
                    <div className='px-[0.75rem] py-[0.5rem] w-full border border-zinc-300 rounded-md mt-[0.5rem]'>
                        <span className='text-base tablet:text-lg font-normal text-mainBlack'>Ingredients</span>

                        <div className='flex items-center justify-start gap-[0.5rem] overflow-x-auto mt-[0.5rem]'>
                            {tempIng.map((ingredient, index) => (


                                <div key={index} className='bg-zinc-300 px-[0.5rem] py-[0.25rem] flex justify-between items-center rounded-md gap-[0.5rem] mb-4'>
                                    <span className='text-sm font-light text-mainBlack'>{ingredient}</span>

                                    <FontAwesomeIcon icon={faXmark} className='text-sm text-mainBlack cursor-pointer'
                                        onClick={() => {
                                            const updatedIngredients = [...tempIng];
                                            updatedIngredients.splice(index, 1);
                                            setTempIng(updatedIngredients);
                                        }}
                                    />
                                </div>
                            ))}
                        </div>

                        <div className='flex justify-center items-center gap-[0.5rem] mt-[0.5rem]'>

                            <input
                                className='px-[0.75rem] py-[0.5rem] w-full text-mainBlack text-lg border border-zinc-300 rounded-md'
                                placeholder='Ingredient'
                                value={newIngredient}
                                onChange={(e) => setNewIngredient(e.target.value)}
                            />

                            <button
                                className='flex flex-none py-[0.5rem] justify-center items-center w-[4rem] bg-secondary text-primary text-lg rounded-md'
                                type='button'
                                onClick={() => {
                                    if (!tempIng.includes(newIngredient)) {
                                        setTempIng((prevTempIng) => [...prevTempIng, newIngredient]);
                                        setNewIngredient("");
                                        toast.success('Ingredient Added')
                                    } else {
                                        toast.error("Ingredient already in the array");
                                    }
                                }}
                            >Add</button>
                        </div>
                    </div>

                    {/* procedure */}
                    <div className='px-[0.75rem] py-[0.5rem] w-full border border-zinc-300 rounded-md mt-[0.5rem]'>
                        <span className='text-base tablet:text-lg font-normal text-mainBlack'>Procedures</span>

                        <div className='flex flex-col h-[10rem] justify-start gap-[0.5rem] overflow-y-auto mt-[0.5rem] pb-4'>
                            {tempSteps.map((step, index) => (


                                <div className='bg-zinc-300 px-[0.5rem] py-[0.25rem] flex justify-between items-center rounded-md gap-[0.5rem]' key={index}>
                                    <span className='text-sm font-light text-mainBlack'>{step}</span>

                                    <FontAwesomeIcon icon={faXmark} className='text-sm text-mainBlack cursor-pointer'
                                        onClick={() => {
                                            const updatedSteps = [...tempSteps];
                                            updatedSteps.splice(index, 1);
                                            setTempSteps(updatedSteps);
                                        }}
                                    />
                                </div>

                            ))}
                        </div>

                        <div className='flex justify-center items-center gap-[0.5rem] mt-[0.5rem]'>

                            <input
                                className='px-[0.75rem] py-[0.5rem] w-full text-mainBlack text-lg border border-zinc-300 rounded-md'
                                placeholder='Procedure'
                                value={newStep}
                                onChange={(e) => setNewStep(e.target.value)}
                            />

                            <button
                                className='flex flex-none py-[0.5rem] justify-center items-center w-[4rem] bg-secondary text-primary text-lg rounded-md'
                                type='button'
                                onClick={() => {
                                    if (!tempSteps.includes(newStep)) {
                                        setTempSteps((prevTempSteps) => [...prevTempSteps, newStep]);
                                        setNewStep("");
                                        toast.success('Step Added')
                                    } else {
                                        toast.error("Step already in the array");
                                    }
                                }}
                            >Add</button>
                        </div>
                    </div>
                </div>

                <button
                    className='w-full py-[1rem] text-base font-medium text-primary bg-secondary mt-[0.75rem] rounded-md'
                    type='submit'
                    onClick={() => {
                        const newIngredients = tempIng.filter((ingredient) => !formData.ingredients.includes(ingredient));
                        const newSteps = tempSteps.filter((step) => !formData.steps.includes(step));
                        setFormData((prevFormData) => ({
                            ...prevFormData,
                            ingredients: [...prevFormData.ingredients, ...newIngredients],
                            steps: [...prevFormData.steps, ...newSteps],
                            image: tempImg,   // Update the formData with the new image URL
                        }));
                        // Save formData to Firestore
                    }}
                >
                    Add Recipe
                </button>
            </form>
        </div>
    )
}
