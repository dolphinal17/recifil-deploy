import { addDoc, collection, deleteDoc, doc, getDocs, query, serverTimestamp } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../../../config/firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTrash } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import {ModalApprovePost} from '../../molecules/molecules.js'




export default function TablePosts() {

    const [posts, setPosts] = useState([])
    const [approvePost, setApprovePost] = useState([])
    const [archivepost, setArchivePost] = useState([])
    const [loading, setLoading] = useState(false)
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [openModalAP, setOpenModalAP] = useState(false);

    const fetchRecipes = async () => {
        const recipesCollectionRef = query(collection(db, "createpost"));

        const snapshot = await getDocs(recipesCollectionRef);
        const recipes = snapshot.docs.map((doc) => ({
            uid: doc.id,
            viewing: false,
            ...doc.data(),
        }));
        setPosts(recipes);
    };

    useEffect(() => {
        fetchRecipes();
    }, []);


    const handleFavoriteClick = async (recipeDoc, recipeId) => {
        try {
            const { title, desc, imgUrls, ingredients, steps, userName, userPhoto, userRef, viewing } = recipeDoc;
            const approveRef = collection(db, `approvepost`);
            setIsButtonDisabled(true); 

            setLoading(true)
            await addDoc(approveRef, {title, desc, imgUrls, ingredients, steps, userName, userPhoto, userRef, viewing});
            if (recipeDoc) {
                const postRef = doc(db, 'createpost', recipeId);
                await deleteDoc(postRef);
                fetchRecipes();
                setLoading(false)

                const notificationsRef = collection(db, `userinfo/${userRef}/notifications`);
                await addDoc(notificationsRef, {
                  type: "Your post is approved!",
                  postId: recipeId,
                  timestamp: serverTimestamp(),
                    postimage: imgUrls,
                    postname: title,
                    profileUrl: '/profile',
                });

                toast.success('Post Approved');
            }

        } catch (error) {
            console.log(error);
        } finally {
            setTimeout(() => setIsButtonDisabled(false), 1000); // enable the button after a short delay
          }
    };




    const handleArchiveClick = async (recipeDoc, recipeId) => {
        try {

            const { title, desc, imgUrls, ingredients, steps, userName, userPhoto, userRef, viewing } = recipeDoc;
            const archiveRef = collection(db, 'archivepost');
            setIsButtonDisabled(true); 

            setLoading(true)
            await addDoc(archiveRef, {title, desc, imgUrls, ingredients, steps, userName, userPhoto, userRef, viewing});
            console.log(recipeId)
            if (recipeDoc) { 
                             
                const postRef = doc(db, 'createpost', recipeId);
                await deleteDoc(postRef);
                fetchRecipes();
                setLoading(false)
                toast.success('Post Archived');
            } else {
                console.log('Error')
            }

        } catch (error) {
            console.log(error);
            toast.error("Error archiving post");
        } finally {
            setTimeout(() => setIsButtonDisabled(false), 1000); // enable the button after a short delay
          }
    };




    return (
        <div className='flex flex-col justify-center items-center gap-[1rem]'>
            <ModalApprovePost onOpen={openModalAP} onClose={() => setOpenModalAP(false)}/>
            { posts.length === 0 ? (
                <h1>No Pending Posts</h1>
            ) : <>
            {posts.map((recipe, i) => (
                <div>
                    <div className='flex justify-between items-center px-[1rem] py-[0.5rem] bg-bgColorTwo'>
                        <h1 className='text-primary text-lg font-normal'>Pending</h1>

                        <div className='flex items-center gap-[0.5rem]'>
                            {/* deleted function here > //onClick={() => handleFavoriteClick(recipe, recipe.uid)} */}
                            <button onClick={() => setOpenModalAP(true)}
                            disabled={isButtonDisabled}
                            className='py-[0.25rem] w-[88px] bg-secondary hover:bg-lime-700 flex items-center justify-center gap-[0.25rem] text-primary rounded-sm text-sm'>
                                <FontAwesomeIcon icon={faCheck} className='text-primary text-sm' />

                                Approve
                            </button>

                            <button className='py-[0.25rem] w-[88px] bg-zinc-600 hover:bg-zinc-700 flex items-center justify-center gap-[0.25rem] text-primary rounded-sm text-sm'
                                onClick={() => handleArchiveClick(recipe, recipe.uid)}
                                disabled={isButtonDisabled}
                                key={i}
                            >
                                <FontAwesomeIcon icon={faTrash} className='text-primary text-sm' />

                                Archive
                            </button>
                        </div>
                    </div>

                    <div className='w-full max-w-[47.5rem] h-auto sm:h-[17rem] grid sm:grid-cols-3 shadow-[0_3px_10px_rgb(0,0,0,0.2)]' key={i}>
                        <div className='col-span-1 w-full h-[17rem] bg-textFadeBlack'>
                            <img src={recipe.imgUrls} alt='recipeimg' className='w-[253px] h-full object-cover'></img>
                        </div>

                        <div className='col-span-1 sm:col-span-2 w-full pt-[1rem] px-[1rem] bg-primary h-auto sm:h-[17rem] relative'>
                            <div className='flex flex-col gap-[1rem]'>
                                {/* user profile and icon */}
                                <div className='flex justify-between items-center w-full'>
                                    {/* user's profile */}
                                    <div className='flex items-center gap-[0.5rem]'>
                                        <div className='w-[3rem] h-[3rem] rounded-full'>
                                            <img src={recipe.userPhoto} alt='userimg' className='w-full h-full object-cover rounded-full'></img>
                                        </div>

                                        <label className='text-base tablet:text-lg font-medium text-textMainBlack'>{recipe.userName}</label>
                                    </div>


                                    {/* <div className='flex flex-col justify-around'>
                                        <button className='bg-[#84cc16] text-white p-2 rounded-md mb-2' onClick={() => handleFavoriteClick(recipe, recipe.id)}>Approve Post</button>
                                        <button className='bg-red-600 text-white p-2 rounded-md'>Delete Post</button>
                                    </div> */}
                                </div>

                                {/* about and ingredients */}
                                <div className="w-full flex flex-col gap-[0.5rem] h-[180px] overflow-auto scroll-smooth scrollbar-hide pb-0 tablet:pb-[1rem]">
                                    {/* about recipe and recipe name */}
                                    <div className='flex flex-col gap-[0.5rem]'>
                                        <div className='flex gap-[0.5rem] items-center'>
                                            {/* <FontAwesomeIcon icon={faTag} className='text-secondary text-[0.75rem]' /> */}

                                            <label className='text-base font-semibold tablet:font-bold text-textMainBlack'>{recipe.title}</label>
                                        </div>

                                        <label className='text-sm font-ligth tablet:font-normal text-textMainBlack'>{recipe.desc}</label>
                                    </div>

                                    {/* Ingredients */}
                                    <div className='flex flex-col gap-[0.5rem]'>
                                        <label className='text-sm tablet:text-base font-medium text-textFadeBlack'>Ingredients</label>

                                        <ul className='flex flex-wrap items-center gap-[0.25rem] laptop:px-0 pb-[1rem]'>
                                            {recipe.ingredients.map((ingredient, i) => (
                                                <li className='flex-none text-xs font-normal text-primary py-[0.25rem] px-[0.5rem] bg-bgColorTwo rounded-md' key={i}>{ingredient}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                {/* comments */}
                                {/* <button className='p-[0.375rem] flex items-center text-sm font-normal text-textFadeBlack absolute bottom-0 right-0 border-solid border-2 border-[#EDEDED] rounded-md'><FontAwesomeIcon icon={faComment} className='text-secondary text-sm mr-[0.25rem]'/>3 comments</button>     */}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            </>}
        </div>
    )
}
